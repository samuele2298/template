import { Component, OnInit, inject } from '@angular/core';
import { ClrDatagridModule, ClrInputModule, ClrLoadingButtonModule, ClrLoadingModule, ClrLoadingState, ClrComboboxModule, ClarityModule} from '@clr/angular';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { Coin, defaultCoin, getSafeCoin, OHCL } from '../../common/model/coin';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, ChartDataset, ChartType, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from 'chartjs-plugin-annotation'; // Import the plugin
import { Category, defaultCategory, getSafeCategory, getSafeCategoryList } from '../../common/model/category';
import { formatNumber } from '../../utils';  // Import the function
import { AuthService } from '../../auth.service';
import { TabledataService } from '../../tabledata.service';

Chart.register(...registerables, zoomPlugin, annotationPlugin); // Register the plugin

@Component({
    selector: 'app-coin',
    standalone: true,
    imports: [ClrDatagridModule, ClrLoadingModule, ClrLoadingButtonModule, FormsModule, DatePipe, ClrInputModule, ClrComboboxModule, ClarityModule, CommonModule],
    templateUrl: './coin.component.html',
    styleUrl: './coin.component.css'
})
export class CoinComponent implements OnInit {
    private tabledataService = inject(TabledataService);
    private apiService = inject(ApiService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private authService = inject(AuthService);

    formatNumber: (value: number) => string;  // Declare the formatNumber function as a property of the class

    loadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

    coin: Coin  = defaultCoin;
    selectedCategory: Category = defaultCategory;
    categories: Category[] = [];
    name: string | null = '-1';

    seasonality_chart: Chart | null = null;
    chart: Chart | null = null;
    profile_chart: Chart | null = null;

    timeframes = ['15 min', '1 hour', '4 hour', '1 Day', '1 Week', '1 Month'];
    selectedTimeframe: string = this.timeframes[3]; // Default selected timeframe

    selectedMetric: number = 0;

    constructor() {
      this.formatNumber = formatNumber;  
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
          this.name = params.get('name');
          if (!this.name || this.name === '') {
              console.error("ID non valido o mancante.");
              this.loadingState = ClrLoadingState.ERROR;
              this.router.navigate(['/404']); 
          } else {
            this.getCoin();
          }
      });
    }

    getCoin() {
        this.loadingState = ClrLoadingState.LOADING;   
        const weights = this.tabledataService.getWeights();  
        this.apiService.getCoin(this.name!).subscribe(coin => {
          this.coin = getSafeCoin(coin);
          this.createSeasonalityChart();
          this.selectTimeframe('1 Day');
          this.getCategories();
          this.loadingState = ClrLoadingState.SUCCESS;
        }); 
    }


    getCategories() {
      this.loadingState = ClrLoadingState.LOADING;   
      const weights = this.tabledataService.getWeights();  
      this.apiService.getCoinCategories(this.name!).subscribe(categories => {
        for(const cat of categories){
          cat.trd_score = (cat.trd_price_score * (weights.price /100)) +  
            (cat.trd_volu_score * (weights.volu /100)) + 
            (cat.trd_vol_score * (weights.vol /100));
            cat.inv_score = (cat.inv_price_score * (weights.price /100)) +  
            (cat.inv_volu_score * (weights.volu /100)) + 
            (cat.inv_vol_score * (weights.vol /100));
          this.categories.push(getSafeCategory(cat));
        }
        if(this.categories.length > 1)this.selectedCategory = this.categories[0];
      }); 
  }

    //MAIN CHART
    createChart(tf: number): void {
      let data: OHCL[] = [];
      let labels: string[]  = [];
      let dataForChart: number[]  = [];
      let datasets:  ChartDataset<ChartType, number[]>[]  = [];
      let volumeData: number[] = [];
      let volatilityData: number[] = [];
      let isInv: boolean = false;

      switch (tf) {
        case 0: data = this.coin.f_chart || []; break;
        case 1: data = this.coin.s_chart || []; break;
        case 2: data = this.coin.t_chart || []; break;
        case 3: data = this.coin.d_chart || []; isInv = true; break;
        case 4: data = this.coin.w_chart || []; isInv = true; break;
        case 5: data = this.coin.m_chart || []; isInv = true; break;
        default: data = this.coin.f_chart || []; break;
      }

      if (this.chart) {
        this.chart.destroy();
        this.chart.clear();
      }

      ////////////////////////////////////////////////////////////////////////
      //DAA PRICE / VOL / VOLUME

      data = data.slice(19); //Salta i prim perceh non ce volu o vol
      labels = data.map((ohcl: OHCL) => {
        const date = new Date(ohcl.ts*1000);
        const day = date.getDate();
        const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 for actual month number
        const year = date.getFullYear() % 100; // get last two digits of the year
      
        // Format the time
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
        if (isInv) {
          // If isInv is true, return the formatted date
          return `${day}-${month}-${year}`;
        } else {
          // If isInv is false, return the formatted time and date
          return `${time}`;
        }
      });
      dataForChart =  data.map((ohcl: OHCL) => ohcl.close);  
      volumeData = data.map((ohcl: OHCL) => ohcl.volu);
      volatilityData = data.map((ohcl: OHCL) => ohcl.vol);

      // Define a scaling factor for the volume bars
      const volumeScaleFactor = 0.3;  // Adjust as needed for better scaling of volume bars
      const scaledVolumeData = volumeData.map(vol => vol * volumeScaleFactor);
      const scaledVolData = volatilityData.map(vol => vol * volumeScaleFactor);

      datasets.push({
        label: this.coin!.name.toString(),
        type: 'line',
        data: dataForChart,
        borderWidth: 4,
        borderColor: 'hsl(300, 100%, 70%)', // Light pink/purple border color
        backgroundColor: 'hsl(300, 100%, 70%)', // Light pink background color
        fill: false,
        tension: 0.8,
        pointRadius: 0,
        order: 0,
        pointHoverRadius: 8,
        cubicInterpolationMode: 'monotone',
        yAxisID: 'yPrice', // Use secondary Y-axis for volume

      });

      datasets.push({
        label: 'Volume',
        type: 'bar',
        data: scaledVolumeData,
        backgroundColor: 'hsl(0, 0%, 60%)',
        borderColor: 'hsl(0, 0%, 60%)',
        borderWidth: 0,
        order: 1,
        yAxisID: 'yVolume', // Use secondary Y-axis for volume
      });

      datasets.push({
        label: 'Volatility',
        type: 'line',
        data: scaledVolData,
        backgroundColor: 'hsl(190, 70%, 50%)', // Cool teal shade for volatility
        borderColor: 'hsl(190, 70%, 50%)', // Matches the background color
        borderWidth: 3,
        tension: 0.8,
        pointRadius: 0,
        pointHoverRadius: 8,
        order: 2,
        yAxisID: 'yVol', // Use secondary Y-axis for volatility
      });

      ////////////////////////////////////////////////////////////////////////
      //VOLUME PROFILE
      const N =20;  // Number of intervals VP
      const factorN = 2.8;  // Number of intervals VP
      const maxLength = 20;  // Number of intervals VP

      // Calculate the price range and price step size
      const priceRange = { min: Math.min(...dataForChart), max: Math.max(...dataForChart) };
      const priceStep = (priceRange.max - priceRange.min) / N;  // Price step for each interval (e.g., 1k$ per step)
      const volumeProfile: { [key: string]: number } = {};

      data.forEach(ohcl => {
        // Determine the price bin based on the price step
        const bin = Math.floor((ohcl.close - priceRange.min) / priceStep);
        const binLabel = (priceRange.min + bin * priceStep).toFixed(2);  // Label for the bin (price level)
        
        // Add the volume for this price interval (bin)
        volumeProfile[binLabel] = (volumeProfile[binLabel] || 0) + ohcl.volu;
      });

      let volumeProfileLabels = Object.keys(volumeProfile).sort((a, b) => parseFloat(a) - parseFloat(b));
      let volumeProfileData = volumeProfileLabels.map(label => volumeProfile[label]);

      //LOG
      //console.log(volumeProfile);
      //console.log(volumeProfileLabels);
      //console.log(volumeProfileData);  

      // POC: Calculate the Point of Control (POC) – the price level with the highest volume
      const pocPrice = volumeProfileLabels.length != 0 ? 
        volumeProfileLabels.reduce((poc, label) => {
          return volumeProfile[label] > volumeProfile[poc] ? label : poc;
        }): 
        '0';

      ////////////////////////////////////////////////////////////////////////
      //ANNOTATION
      const scaleVolumesToRange = (volumes: number[]): number[] => {
        // Find the maximum and minimum volume values in the array
        const maxVolume = Math.max(...volumes);
        const minVolume = Math.min(...volumes);
        
        // Check if maxVolume is equal to minVolume to avoid division by zero
        if (maxVolume === minVolume) {
          // If all volumes are the same, return an array of 1s (or any other constant value)
          return new Array(volumes.length).fill(1);
        }
      
        // Map each volume to a value between 1 and 10
        const scaledVolumes = volumes.map(volume => {
          // Calculate the scaled value based on the volume's position in the range
          const scaledValue = ((volume - minVolume) / (maxVolume - minVolume)) * maxLength + 1;
          
          // Return the scaled value, rounded to an integer between 1 and 10
          return Math.round(scaledValue);
        });
      
        return scaledVolumes;
      };
      
      // Adjust the generateBoxes function
      const generateBoxes = (volumeProfileData: number[], volumeProfileLabels: string[], reference: number[]) => {
        if(volumeProfileData.length === 1 || volumeProfileLabels.length === 1 || volumeProfileLabels.length === 0) {
          return [];
        }
        const boxes: any[] = [];
        
        // Box height will cover $5000 range, so adjust the vertical scale for each box
        const priceRangeStep = (Number(volumeProfileLabels[1]) - Number(volumeProfileLabels[0]))/factorN;
      
        // To align boxes to the right and gradually move left
        let xPosition = labels.length - 1; 
        
        volumeProfileLabels.forEach((label, index) => {
          const price = parseFloat(label);

          const xMin = labels.length - reference[index];
          const xMax = labels.length;  


          const yMin = price - priceRangeStep;
          const yMax = price + priceRangeStep;  
            
   
          boxes.push({
            type: 'box',
            xMin: xMin,  // Start from the right
            xMax: xMax,  // End at the calculated width
            yMin: yMin,
            yMax: yMax,
            backgroundColor: 'rgba(255, 255, 255, 0.3)',  // Box color
            borderWidth: 0,
          });
        });
      
        return boxes;
      };

      const combinedAnnotations = {
        pocLine: {
          type: 'line',
          yMin: parseFloat(pocPrice),  // POC is the price with the highest volume
          yMax: parseFloat(pocPrice),  // Same value to make it a horizontal line
          borderColor: 'rgba(255, 255, 255, 0.7)', // White color for POC
          borderWidth: 4,
          label: {
            content: 'POC (Point of Control)',
            position: 'start',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            font: { size: 12 }
          }
        },
        ...generateBoxes(volumeProfileData, volumeProfileLabels, scaleVolumesToRange(volumeProfileData)).reduce((acc, box, index) => {
          acc[`box${index}`] = box; 
          return acc;
        }, {})
      };

      //console.log(combinedAnnotations);
      const formatChartNumber = (value: number): string =>{
        // If the number is very small, use scientific notation
        if (Math.abs(value) < 0.0001 && Math.abs(value) > 0) {
          const scientificNotation = value.toExponential(20);  // Get scientific notation with 20 decimals to cover small numbers
          const [coefficient, exponent] = scientificNotation.split('e');
          
          // Remove leading zeroes and scale the coefficient accordingly
          const exponentValue = parseInt(exponent, 10);
          let adjustedCoefficient = parseFloat(coefficient) * Math.pow(3, -exponentValue);
      
          // Ensure that the coefficient is an integer value
          adjustedCoefficient = Math.round(adjustedCoefficient);
      
          return `${adjustedCoefficient} * 10^${exponentValue}`;
        }
        else if (Math.abs(value) < 10 && Math.abs(value) > 0.1) 
          return `$${Number(value).toFixed(2)}`;
        else if (Math.abs(value) < 0.1 && Math.abs(value) > 0.001) 
          return `$${Number(value).toFixed(4)}`;
        // For other cases, round to 4 decimal places
        return `$${Number(value).toFixed(0)}`;
      }

      ////////////////////////////////////////////////////////////////////////
      //CHART
      this.chart = new Chart('chart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: { 
              top: 30,
              bottom: 30, 
              left: 0, 
              right: 0 
            }
          },
          plugins: {
            annotation: {
              annotations: this.isPro()? combinedAnnotations : [],
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#fff', // Colore del testo
                boxWidth: 20,   // Rimuove il quadratino colorato accanto al testo
                borderRadius: 100,
              },
              onClick: (e, legendItem, legend) => {
                const chart = legend.chart; // Reference to the chart instance
  
                if (legendItem.text === 'Volume') {
                  // Handle toggling for Volume Profile
                  const dataset = chart.data.datasets.find(ds => ds.label === 'Volume');
                  if (dataset) {
                    dataset.hidden = !dataset.hidden; // Toggle visibility of Volume dataset
                    chart.update(); // Apply changes
                  }
                } 
                else if (legendItem.text === this.coin!.name.toString()) {
                  const dataset = chart.data.datasets.find(ds => ds.label === this.coin!.name.toString());
                  if (dataset) {
                    dataset.hidden = !dataset.hidden; // Toggle visibility of Volume dataset
                    chart.update(); // Apply changes
                  }
                  const annotationsPlugin = chart.config.options!.plugins!.annotation;
        
                  if (annotationsPlugin && annotationsPlugin.annotations && this.isPro()) {
                    // Toggle annotations
                    annotationsPlugin.annotations = 
                      Object.keys(annotationsPlugin.annotations).length > 0 ? {} : combinedAnnotations;
                    
                    chart.update(); // Update the chart to apply the changes
                  }
                 
                } else if (legendItem.text === 'Volatility') {
                  // Handle toggling for Volume Profile
                  const dataset = chart.data.datasets.find(ds => ds.label === 'Volatility');
                  if (dataset) {
                    dataset.hidden = !dataset.hidden; // Toggle visibility of Volume dataset
                    chart.update(); // Apply changes
                  }
                } 
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const datasetLabel = tooltipItem.dataset.label;
                  const dataIndex = tooltipItem.dataIndex;
            
                  // Utility function to format numbers
                  const formatNumber = (value: number) => {
                    if (Math.abs(value) >= 1e12) return `${(value / 1e12).toFixed(2)}T$`; // Trillions
                    if (Math.abs(value) >= 1e9) return `${(value / 1e9).toFixed(2)}B$`;  // Billions
                    if (Math.abs(value) >= 1e6) return `${(value / 1e6).toFixed(2)}M$`;  // Millions
                    if (Math.abs(value) >= 1e3) return `${(value / 1e3).toFixed(2)}K$`;  // Thousands
                    return `${value.toFixed(2)}$`; // Default format for smaller numbers
                  };
            
                  if (datasetLabel === this.coin!.name.toString()) {
                    const price = dataForChart[dataIndex];
                    console.log(dataForChart[dataIndex])
                    return ` Price: ${formatNumber(price)}`;
                  } else if (datasetLabel === 'Volume') {
                    const volume = volumeData[dataIndex];
                    return ` Volume: ${formatNumber(volume)}`;
                  } else if (datasetLabel === 'Volatility') {
                    const volatility = volatilityData[dataIndex];
                    return ` Volatility: ${volatility}`;
                  }
                  return '';
                },
              },
            },            
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'x',
              },
              pan: {
                enabled: true,
                mode: 'x',
              },
            }  
          },
          scales: {
            x: {
              ticks: {
                color: '#fff',
                font: { size: 10, weight: 'bold' }
              }
            },
            yPrice: {
              position: 'left',
              grid: { display: false },
              ticks: { 
                color: '#fff', 
                font: { size: 10, weight: 'bold' },
                callback: function(value, index, ticks) {
                  return formatChartNumber(Number(value));                   
                }
              },
            },
            yVolume: {
              display: false,
              position: 'right', // Position the volume Y-axis on the right
              grid: { display: false },
              ticks: { color: '#fff', font: { size: 12, weight: 'bold' } },
              min: 0, // Optional: Adjust min/max as per volume data
              max: Math.max(...volumeData), // Optional: Set the max value of volume
            },
            yVol: {
              display: false,
              position: 'right', // Position the volatility Y-axis on the right
              grid: { display: false },
              ticks: { color: '#fff', font: { size: 12, weight: 'bold' } },
              min: 0, // Optional: Adjust min/max as per volatility data
              max: Math.max(...volatilityData), // Optional: Set the max value of volatility
            },
            
          },
          animation: {
            duration: 1000,
          },
        },
      });

      /* this.profile_chart = new Chart('profile_chart', {
        type: 'bar',
        data: { 
          labels: volumeProfileLabels, 
          datasets: [{
          label: 'Volume Profile',
          type: 'bar',
          data: volumeProfileData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          xAxisID: 'xVolumeProfile', // Linked to the volume profile x-axis
        }]},
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: { top: 30, bottom: 30, left: 0, right: 0 }
          },
          plugins: {
            legend: {
              display: false,
              position: 'left',
            }
          },
          scales: {
            x: {

              grid: { display: false },
              ticks: { color: '#fff', font: { size: 12, weight: 'bold' } },
            },
            y: {
              position: 'left',
              grid: { display: false },
              ticks: { color: '#fff', font: { size: 12, weight: 'bold' } },
            },
  
            xVolumeProfile: {
              display: false, // Hide the secondary Y-axis for volume
            },

          },
          elements: {
            line: {
              borderCapStyle: 'round',
              borderJoinStyle: 'round',
            },
          },
          animation: {
            duration: 1000,
          },
        },
      }); */
    } 

    //SEASONALITY
    createSeasonalityChart(): void {
      let seasonalityData: any;
      // Check if seasonality is already an object or a string
      if (typeof this.coin.seasonality === 'string' && this.coin.seasonality != '') {
        try {
          seasonalityData = JSON.parse(this.coin.seasonality.trim());
        } catch (error) {
          console.error('Failed to parse seasonality data as JSON:', error);
          seasonalityData = {}; // Fallback to an empty object if parsing fails
        }      
      } else if (typeof this.coin.seasonality === 'object' && this.coin.seasonality !== null) {
        seasonalityData = this.coin.seasonality;  // Use directly if it's already an object
      } else {
        // Handle the case where seasonality data is empty or invalid
        console.warn("Seasonality data is not available.");
        seasonalityData = {};  // Fallback to an empty object
      }

      const labels = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      const datasets: ChartDataset<"line", number[]>[] = [];

      const colorPalette = [
        'rgba(255, 99, 132, 1)',   // Light Red (Bright, intense red)
        'rgba(255, 159, 64, 1)',   // Orange (Warm orange)
        'rgba(255, 205, 86, 1)',   // Yellow (Soft yellow)
        'rgba(75, 192, 192, 1)',   // Teal (Blue-green)
        'rgba(54, 162, 235, 1)',   // Light Blue (Vibrant light blue)
        'rgba(153, 102, 255, 1)',  // Purple (Rich purple)
        'rgba(201, 203, 207, 1)',  // Light Gray (Subtle gray)
        'rgba(231, 76, 60, 1)',    // Red (Bright red)
        'rgba(46, 204, 113, 1)',   // Emerald Green (Vibrant green)
        'rgba(52, 152, 219, 1)',   // Sky Blue (Soft sky blue)
        'rgba(142, 68, 173, 1)',   // Purple (Muted violet)
        'rgba(39, 174, 96, 1)'     // Green (Distinct green)
      ];

      const adjustOpacity = (color: string, opacity: number): string => {
        // Match rgba color format: rgba(r, g, b, a)
        const rgbaMatch = color.match(/rgba\((\d+), (\d+), (\d+), (\d(\.\d+)?)\)/);
        
        if (rgbaMatch) {
          const [_, r, g, b, a] = rgbaMatch;
          // Return the new color with adjusted opacity
          return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        
        // If color is not in rgba format, return it as is (fallback)
        return color;
      };

      // Loop through each year and prepare the datasets
      for (const year in seasonalityData) {
        if (seasonalityData.hasOwnProperty(year)) {
          const yearData = seasonalityData[year];

          // Prepare the data for this year's line chart
          const dataForYear = labels.map((_, index) => {
            // Map each month (index) to its value for the given year
            return yearData[index] ? yearData[index].value : 0;
          });
          const color = colorPalette[datasets.length % colorPalette.length]; // Pick a color
          // Push a new dataset for this year
          datasets.push({
            label: `${year}`,  // Label for this year
            data: dataForYear,  // Values for this year
            borderWidth: 3,  // Line width
            borderColor: color, // Assign color from palette
            backgroundColor: adjustOpacity(color, 1),  // Adjust opacity for fill color
            fill: true,  // Fill under the line
            tension: 0.8,  // Smooth the curve of the line
            pointRadius: 0,  // No point markers
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',  // White points (not visible as pointRadius is 0)
            pointHoverRadius: 8,  // Increase point size on hover
            pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',  // Hover color
            cubicInterpolationMode: 'monotone',  // Smooth interpolation
          });
        }
      }

      //console.log(combinedAnnotations);
      const formatChartNumber = (value: number): string =>{
        // If the number is very small, use scientific notation
        if (Math.abs(value) < 0.0001 && Math.abs(value) > 0) {
          const scientificNotation = value.toExponential(20);  // Get scientific notation with 20 decimals to cover small numbers
          const [coefficient, exponent] = scientificNotation.split('e');
          
          // Remove leading zeroes and scale the coefficient accordingly
          const exponentValue = parseInt(exponent, 10);
          let adjustedCoefficient = parseFloat(coefficient) * Math.pow(3, -exponentValue);
      
          // Ensure that the coefficient is an integer value
          adjustedCoefficient = Math.round(adjustedCoefficient);
      
          return `${adjustedCoefficient} * 10^${exponentValue}`;
        }
        else if (Math.abs(value) < 10 && Math.abs(value) > 0.1) 
          return `$${Number(value).toFixed(2)}`;
        else if (Math.abs(value) < 0.1 && Math.abs(value) > 0.001) 
          return `$${Number(value).toFixed(4)}`;
        // For other cases, round to 4 decimal places
        return `$${Number(value).toFixed(0)}`;
      }
  
      // Create the chart with the dynamic datasets
      this.seasonality_chart = new Chart('seasonality_chart', {
        type: 'line',  // Line chart
        data: {
          labels: labels,  // Months of the year as X-axis labels
          datasets: datasets,  // All datasets (one for each year)
        },
        options: {
          responsive: true,  // Make the chart responsive to screen size
          maintainAspectRatio: false,
          layout: {
            padding: { top: 30, bottom: 30, left: 0, right: 0 } // Minimal padding for a more compact layout
          },
          plugins: {
            legend: {
              display: true, // Show the legend for better understanding of each line
              position: 'top',  // Position the legend at the top
            },
          },
          scales: {
            x: {
              grid: {
                display: false, // Disable the grid under the x-axis
              },
              ticks: {
                font: {
                  size: 12,  // Slightly larger font size for better readability
                  weight: 'bold',  // Bold ticks for modern look
                },
                color: '#fff',  // Lighter color for ticks to match the aesthetic
              },
            },
            y: {
              grid: {
                display: false, // Disable the grid under the y-axis
              },
              ticks: {
                font: {
                  size: 12,  // Slightly larger font size for y-axis ticks
                  weight: 'bold', // Bold ticks for modern look
                },
                color: '#fff',  // Lighter color for ticks to match the aesthetic
                callback: function(value, index, ticks) {
                  return formatChartNumber(Number(value));                   
                }
              },
            },
          },
          elements: {
            line: {
              borderCapStyle: 'round',  // Rounded edges on the line
              borderJoinStyle: 'round',  // Rounded join between line segments
            },
          },
          animation: {
            duration: 1000,  // Smooth animation duration
          },
        },
      });
      
    }

    isLoading() {
      return this.loadingState != ClrLoadingState.SUCCESS;
    }

    selectTimeframe(tf: string): void {
      this.loadingState = ClrLoadingState.LOADING;   
      this.selectedTimeframe = tf;
      if (this.chart) {
        this.chart.destroy();
      }
      /* if (this.profile_chart) {
        this.profile_chart.destroy();  
      } */
      this.createChart(this.timeframes.indexOf(tf));
      this.loadingState = ClrLoadingState.SUCCESS;
    }

    getPositiveNegative(){
      /* if(!this.coin)
        return 'coin-price-positive';
      if(!this.coin!.d_chart)
        return 'coin-price-positive'; */
      return this.coin.d_chart[this.coin.d_chart.length-1].close > this.coin.d_chart[this.coin.d_chart.length-1].open ? 'coin-price-positive' : 'coin-price-negative';
    }

    selectCategory(cat: Category){
      this.selectedCategory = cat;
    }

    isPro(){
      return this.authService.isPro() || this.authService.isAdmin() ;
    }

    goBack(){
      this.router.navigate(['/coins']); 
    }

    goToCategory(){
      this.router.navigate([`/category/${this.selectedCategory.name}`]); 
    }

    giveMetric(coin: Coin, n: number): string {
      switch (n) {
          case 1:
              return this.selectedMetric === 0 ? coin.f.toFixed(2)  : this.selectedMetric === 1 ? coin.f_volu.toFixed(2) : coin.f_vol.toFixed(2) 
          case 2:
              return this.selectedMetric === 0 ? coin.s.toFixed(2)  : this.selectedMetric === 1 ? coin.s_volu.toFixed(2)  : coin.s_vol.toFixed(2) 
          case 3:
              return this.selectedMetric === 0 ? coin.t.toFixed(2)  : this.selectedMetric === 1 ? coin.t_volu.toFixed(2)  : coin.t_vol.toFixed(2) 
          case 4:
              return this.selectedMetric === 0 ? coin.d.toFixed(2)  : this.selectedMetric === 1 ? coin.d_volu.toFixed(2) : coin.d_vol.toFixed(2) 
          case 5:
              return this.selectedMetric === 0 ? coin.w.toFixed(2)  : this.selectedMetric === 1 ? coin.w_volu.toFixed(2)  : coin.w_vol.toFixed(2) 
          default:
              return this.selectedMetric === 0 ? coin.m.toFixed(2)  : this.selectedMetric === 1 ? coin.m_volu.toFixed(2)  : coin.m_vol.toFixed(2) 
      }
    }

    giveCatMetric(n: number): string {
      switch (n) {
        case 1:
            return this.selectedMetric === 0 ? this.selectedCategory.f!.toFixed(2)  : this.selectedMetric === 1 ? this.selectedCategory.f_volu!.toFixed(2) : this.selectedCategory.f_vol!.toFixed(2) 
        case 2:
            return this.selectedMetric === 0 ? this.selectedCategory.s!.toFixed(2)  : this.selectedMetric === 1 ? this.selectedCategory.s_volu!.toFixed(2)  : this.selectedCategory.s_vol!.toFixed(2) 
        case 3:
            return this.selectedMetric === 0 ? this.selectedCategory.t!.toFixed(2)  : this.selectedMetric === 1 ? this.selectedCategory.t_volu!.toFixed(2)  : this.selectedCategory.t_vol!.toFixed(2) 
        case 4:
            return this.selectedMetric === 0 ? this.selectedCategory.d!.toFixed(2)  : this.selectedMetric === 1 ? this.selectedCategory.d_volu!.toFixed(2) : this.selectedCategory.d_vol!.toFixed(2) 
        case 5:
            return this.selectedMetric === 0 ? this.selectedCategory.w!.toFixed(2)  : this.selectedMetric === 1 ? this.selectedCategory.w_volu!.toFixed(2)  : this.selectedCategory.w_vol!.toFixed(2) 
        default:
            return this.selectedMetric === 0 ? this.selectedCategory.m!.toFixed(2)  : this.selectedMetric === 1 ? this.selectedCategory.m_volu!.toFixed(2)  : this.selectedCategory.m_vol!.toFixed(2) 
      } 
    }

    number(value: string): number {
      return Number(value);
  }
}
