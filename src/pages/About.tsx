import React from 'react';
import { Shield, Users, Award, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About ElectroRepair
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Your trusted partner in electronics repair since 2015
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2015, ElectroRepair began as a small repair shop with a simple mission: 
                to provide honest, reliable, and affordable electronics repair services to our community.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Over the years, we've grown from a single technician to a team of certified professionals, 
                but our commitment to quality and customer satisfaction remains unchanged.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to serve thousands of customers across the region, offering comprehensive 
                repair services for all types of electronic devices with industry-leading warranties.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                  <div className="text-gray-600">Devices Repaired</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">9+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                  <div className="text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Quality First',
                description: 'We never compromise on the quality of our repairs or parts used.',
              },
              {
                icon: Users,
                title: 'Customer Focus',
                description: 'Every decision we make is centered around our customers needs.',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'We strive for excellence in every repair and interaction.',
              },
              {
                icon: Clock,
                title: 'Reliability',
                description: 'Consistent, dependable service you can count on every time.',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To provide exceptional electronics repair services that restore functionality, 
              extend device lifespan, and deliver outstanding value to our customers. We're 
              committed to using sustainable practices and the latest technology to ensure 
              every repair meets the highest standards of quality and reliability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;