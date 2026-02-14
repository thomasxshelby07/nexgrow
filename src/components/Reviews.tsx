import React from 'react';

const Reviews = () => {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">What Our Clients Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Placeholder Reviews */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                            <p className="text-gray-600 mb-4">"Exceptional service and outstanding results. Highly recommended!"</p>
                            <div className="font-semibold text-gray-900">Client Name</div>
                            <div className="text-sm text-gray-500">CEO, Company</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
