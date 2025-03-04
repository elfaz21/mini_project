import { motion } from "framer-motion";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Element, Link } from "react-scroll";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col font-sans">
      <nav className="bg-gray-800 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="text-2xl font-bold cursor-pointer"
          >
            Issue Ticketing
          </Link>
          <div>
            <Link
              to="features"
              smooth={true}
              duration={500}
              className="text-lg mx-4 cursor-pointer"
            >
              Features
            </Link>
            <Link
              to="testimonials"
              smooth={true}
              duration={500}
              className="text-lg mx-4 cursor-pointer"
            >
              Testimonials
            </Link>
          </div>
        </div>
      </nav>

      <Element name="hero">
        <header className="flex-grow py-20 flex flex-col items-center justify-center bg-hero-pattern bg-cover bg-center">
          <div className="container mx-auto text-center">
            <motion.h1
              className="text-6xl font-extrabold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to Our Issue Tracking System
            </motion.h1>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Efficiently manage your issues and tickets with our intuitive,
              collaborative platform designed to streamline your workflow.
            </motion.p>
            <RouterLink
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            >
              Get Started
            </RouterLink>
          </div>
        </header>
      </Element>

      <Element name="features">
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Submit Issues Easily",
                  desc: "Users can submit issues quickly with a simple form.",
                  icon: "📝",
                },
                {
                  title: "Track Issue Status",
                  desc: "Monitor the status of your issues.",
                  icon: "📊",
                },
                {
                  title: "Collaborate with Teams",
                  desc: "Work together with your team to resolve issues efficiently.",
                  icon: "🤝",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Element>

      <Element name="testimonials">
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "This system has transformed our workflow!",
                "The best tool for managing issues I've ever used.",
                "Supports collaboration like no other!",
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="italic">“{testimonial}”</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Element>

      <footer className="bg-gray-800 py-10">
        <div className="container mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} Issue Tracking System. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
