import React from 'react';
import { Mail, Phone, Award, Wrench } from 'lucide-react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Lead Technician',
      specialization: 'Mobile Devices & Tablets',
      experience: '8 years',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'alex@electrorepair.com',
      phone: '+1 (555) 123-4567',
    },
    {
      name: 'Sarah Chen',
      role: 'Senior Technician',
      specialization: 'Laptops & Computers',
      experience: '6 years',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'sarah@electrorepair.com',
      phone: '+1 (555) 123-4568',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Gaming Console Specialist',
      specialization: 'PlayStation, Xbox, Nintendo',
      experience: '5 years',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'mike@electrorepair.com',
      phone: '+1 (555) 123-4569',
    },
    {
      name: 'Emily Davis',
      role: 'Audio/Video Technician',
      specialization: 'TVs, Headphones, Speakers',
      experience: '4 years',
      image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'emily@electrorepair.com',
      phone: '+1 (555) 123-4570',
    },
    {
      name: 'James Wilson',
      role: 'Quality Manager',
      specialization: 'Quality Assurance & Testing',
      experience: '7 years',
      image: 'https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'james@electrorepair.com',
      phone: '+1 (555) 123-4571',
    },
    {
      name: 'Lisa Thompson',
      role: 'Customer Service Manager',
      specialization: 'Customer Relations & Support',
      experience: '5 years',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      email: 'lisa@electrorepair.com',
      phone: '+1 (555) 123-4572',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Skilled professionals dedicated to bringing your devices back to life
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Expert Technicians
            </h2>
            <p className="text-xl text-gray-600">
              Each member of our team brings specialized skills and years of experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Wrench className="h-4 w-4 mr-2 text-blue-600" />
                      {member.specialization}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-purple-600" />
                      {member.experience} experience
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-blue-600" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-600">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-purple-600" />
                      <a href={`tel:${member.phone}`} className="hover:text-purple-600">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Team Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Our collective expertise and dedication to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '35+', label: 'Years Combined Experience' },
              { number: '15+', label: 'Certifications' },
              { number: '99%', label: 'Customer Satisfaction' },
              { number: '48hr', label: 'Average Turnaround' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;