import React from 'react';

// Using verified, stable PNG logo URLs for demonstration
const universities = [
  { name: 'IIT Bombay', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/320px-Indian_Institute_of_Technology_Bombay_Logo.svg.png' },
  { name: 'IIT Delhi', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fd/Indian_Institute_of_Technology_Delhi_Logo.svg/320px-Indian_Institute_of_Technology_Delhi_Logo.svg.png' },
  { name: 'IIM Ahmedabad', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/IIM_Ahmedabad_Logo.svg/320px-IIM_Ahmedabad_Logo.svg.png' },
  { name: 'IISc Bangalore', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Indian_Institute_of_Science_logo.svg/320px-Indian_Institute_of_Science_logo.svg.png' },
  { name: 'University of Delhi', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/22/University_of_Delhi.svg/320px-University_of_Delhi.svg.png' },
  { name: 'Jawaharlal Nehru University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Jawaharlal_Nehru_University_logo.svg/320px-Jawaharlal_Nehru_University_logo.svg.png' },
  { name: 'Banaras Hindu University', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Banaras_Hindu_University_logo.svg/320px-Banaras_Hindu_University_logo.svg.png' },
];

const UniversitySlider: React.FC = () => {
  const logos = [...universities, ...universities]; // Duplicate for seamless loop

  return (
    <div className="w-full py-12 bg-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-sm font-semibold text-slate-600 uppercase tracking-wider">
          Trusted by students and faculty at
        </h3>
        <div className="mt-6">
          <div className="relative w-full overflow-hidden">
            <div className="flex animate-marquee">
              {logos.map((uni, index) => (
                <div key={index} className="flex-shrink-0 mx-6 sm:mx-8 flex items-center justify-center" style={{ width: '160px' }}>
                  <img
                    className="max-h-12 w-auto object-contain"
                    src={uni.logoUrl}
                    alt={uni.name}
                    title={uni.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitySlider;