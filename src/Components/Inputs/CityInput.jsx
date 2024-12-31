import React from 'react';
import { TextField, Autocomplete, FormControl, InputLabel, MenuItem } from '@mui/material';
export const indianCities = [
  { name: 'Delhi' },
  { name: 'Mumbai' },
  { name: 'Bangalore' },
  { name: 'Chennai' },
  { name: 'Kolkata' },
  { name: 'Hyderabad' },
  { name: 'Pune' },
  { name: 'Jaipur' },
  { name: 'Agra' },
  { name: 'Indore' },

  { name: 'Angul' },
  { name: 'Athmallik' },
  { name: 'Balangir' },
  { name: 'Titlagarh' },
  { name: 'Patnagarh' },
  { name: 'Balasore' },
  { name: 'Soro' },
  { name: 'Baleswar' },
  { name: 'Bargarh' },
  { name: 'Barpali' },
  { name: 'Boudh' },
  { name: 'Bhawanipatna' },
  { name: 'Kalahandi' },
  { name: 'Berhampur' },
  { name: 'Chatrapur' },
  { name: 'Bhubaneswar' },
  { name: 'Cuttack' },
  { name: 'Banki' },
  { name: 'Dhenkanal' },
  { name: 'Kamakhyanagar' },
  { name: 'Gajapati' },
  { name: 'Paralakhemundi' },
  { name: 'Ganjam' },
  { name: 'Jagatsinghpur' },
  { name: 'Balikuda' },
  { name: 'Jajpur' },
  { name: 'Chandikhol' },
  { name: 'Jharsuguda' },
  { name: 'Kendrapara' },
  { name: 'Rajkanika' },
  { name: 'Keonjhar' },
  { name: 'Champua' },
  { name: 'Karanjia' },
  { name: 'Khordha' },
  { name: 'Jatni' },
  { name: 'Koraput' },
  { name: 'Jeypore' },
  { name: 'Sunabeda' },
  { name: 'Malkangiri' },
  { name: 'Mayurbhanj' },
  { name: 'Baripada' },
  { name: 'Udala' },
  { name: 'Nabarangpur' },
  { name: 'Nuapada' },
  { name: 'Phulbani' },
  { name: 'Kandhamal' },
  { name: 'Puri' },
  { name: 'Konark' },
  { name: 'Rayagada' },
  { name: 'Rourkela' },
  { name: 'Sambalpur' },
  { name: 'Subarnapur' },
  { name: 'Sundargarh' },
  { name: 'Rajgangpur' },
];


const CityInput = ({ label, value, onChange }) => {

  const selectedCity = indianCities.find((city) => city.name === value) || null;

  return (
    <FormControl fullWidth size="small">
      <Autocomplete
        options={indianCities}
        getOptionLabel={(option) => (option && option.name) || ''} 
        value={selectedCity}
        onChange={(event, newValue) => onChange(newValue ? newValue.name : '')}
        sx={{
          '& .MuiInputBase-root': {
            height: '2.5rem',
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiFormLabel-root': {
                fontSize: '0.9rem',
                fontWeight: 'bold',
                color: '#131517',
                width: '100%',
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default CityInput;
