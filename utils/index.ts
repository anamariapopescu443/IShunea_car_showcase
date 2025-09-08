import { CarProps, FilterProps } from "@/types";
import { MPG_CONSTANTS } from "@/constants";

// Function to generate multiple car variations from a single API response
function generateCarVariations(baseCar: CarProps, count: number): CarProps[] {
  if (!baseCar || count <= 1) return [baseCar];
  
  const variations: CarProps[] = [baseCar];
  const currentYear = new Date().getFullYear();
  
  // Car model variations (different trims/versions)
  const modelVariations = [
    'Base', 'Sport', 'Premium', 'Luxury', 'Performance', 'Edition', 'Limited', 'Special'
  ];
  
  // Transmission variations
  const transmissionTypes = ['a', 'm']; // automatic, manual
  
  // Drive variations
  const driveTypes = ['fwd', 'rwd', 'awd'];
  
  // Fuel type variations
  const fuelTypes = ['gas', 'diesel', 'electric', 'hybrid'];
  
  for (let i = 1; i < count; i++) {
    const variation = { ...baseCar };
    
    // Generate unique model name with variation
    const modelVariation = modelVariations[i % modelVariations.length];
    variation.model = `${baseCar.model} ${modelVariation}`;
    
    // Vary the year slightly (±2 years)
    const yearVariation = Math.max(2015, Math.min(currentYear, baseCar.year + (i % 3) - 1));
    variation.year = yearVariation;
    
    // Vary transmission
    variation.transmission = transmissionTypes[i % transmissionTypes.length];
    
    // Vary drive type
    variation.drive = driveTypes[i % driveTypes.length];
    
    // Vary fuel type
    variation.fuel_type = fuelTypes[i % fuelTypes.length];
    
    // Vary cylinders (4, 6, 8)
    const cylinderOptions = [4, 6, 8];
    variation.cylinders = cylinderOptions[i % cylinderOptions.length];
    
    // Vary displacement slightly
    variation.displacement = baseCar.displacement + (i * 0.2);
    
    // Vary class
    const classVariations = ['compact', 'midsize', 'fullsize', 'suv', 'sports car', 'luxury'];
    variation.class = classVariations[i % classVariations.length];
    
    variations.push(variation);
  }
  
  return variations;
}

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers = {
    'x-rapidapi-key': '604b096630msh3ab5ab617a5d7c2p1a2d5ejsnb5a834bbdf15',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  }

  try {
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}`, { headers });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const result = await response.json();
    
    // If we get a single car, generate variations
    if (Array.isArray(result) && result.length === 1) {
      const baseCar = result[0];
      const requestedLimit = limit || 10;
      const generatedCars = generateCarVariations(baseCar, requestedLimit);
      return generatedCars;
    }
    
    // If we get multiple cars (premium users), return as is
    return result;
    
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  city_mpg = 23;
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle? : string) => {
//key...
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { make, year, model } = car;
  url.searchParams.append('customer','img');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);  
  url.searchParams.append('angle', `${angle}`);

return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};