import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, TreePalm, Globe2, Users, Star, Activity } from 'lucide-react';
import image3 from '../assets/image3.jpg';

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target);
    if (start === end) return;

    const duration = 2000;
    const incrementTime = Math.floor(duration / end);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span className="text-4xl font-bold text-green-700">{count}</span>;
};

const About = () => {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const impactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cards = [
    {
      icon: Leaf,
      title: "Our Mission",
      text: "Empowering people to actively plant and track trees globally.",
      ref: missionRef,
    },
    {
      icon: TreePalm,
      title: "Our Vision",
      text: "Create a digital green ecosystem that spans across continents.",
      ref: visionRef,
    },
    {
      icon: Globe2,
      title: "Our Impact",
      text: "Thousands of plantations tracked, countless lives touched.",
      ref: impactRef,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800 text-center p-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 dark:text-green-300 mb-4">
          🌱 About GreenTrack
        </h1>
        <p className="text-lg md:text-xl text-green-700 dark:text-green-400 max-w-2xl mx-auto">
          Join the green movement and track the change you make on Earth.
        </p>
      </motion.div>

      {/* Mission, Vision, Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.03 }}
            onClick={() => scrollToSection(card.ref)}
            className="cursor-pointer bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-green-200 text-center hover:ring-4 hover:ring-green-300 transition-all duration-300"
          >
            <div className="relative flex justify-center mb-4">
              <div className="absolute w-16 h-16 bg-green-100 rounded-full blur-xl opacity-60" />
              <card.icon className="h-10 w-10 text-green-600 z-10" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-green-800 dark:text-green-200">
              {card.title} 🌿
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{card.text}</p>
            <p className="text-sm mt-2 text-green-500">Read More →</p>
          </motion.div>
        ))}
      </div>

      {/* Detailed Sections */}
      <div className="mt-24 space-y-20 px-4 max-w-4xl mx-auto text-left">
        <div ref={missionRef} className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-200 mb-3">🌱 Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We believe in empowering communities by encouraging sustainable planting.
            Our mission is to enable users globally to plant, record, and track tree
            plantations using real-time data, maps, and analytics.
          </p>
        </div>

        <div ref={visionRef} className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-200 mb-3">🌍 Our Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Our vision is to create a digital green ecosystem — connecting every region
            under a unified platform to combat climate change, promote afforestation,
            and inspire environmental stewardship across borders.
          </p>
        </div>

        <div ref={impactRef} className="scroll-mt-20">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-200 mb-3">💚 Our Impact</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Over the last year, we’ve tracked thousands of plantations globally.
            Each sapling planted means cleaner air, better climate, and stronger biodiversity.
            Our users have touched lives and landscapes through dedicated action.
          </p>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
        {[{
          icon: TreePalm,
          label: 'Trees Planted',
          count: 12050,
        }, {
          icon: Users,
          label: 'Contributors',
          count: 860,
        }, {
          icon: Activity,
          label: 'Cities Covered',
          count: 78,
        }].map((stat, i) => (
          <motion.div
            key={i}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md text-center"
          >
            <stat.icon className="h-10 w-10 text-green-600 mb-2 mx-auto" />
            <Counter target={stat.count} />
            <p className="mt-2 text-green-800 dark:text-green-200 font-semibold">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <div className="mt-20 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-8">Meet Our Eco-Heroes 💚</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Rakesh', role: 'Founder', img: image3 },
            { name: 'Aryan', role: 'Growth Lead', img: 'https://i.pravatar.cc/150?u=2' },
            { name: 'Sneha', role: 'Designer', img: 'https://i.pravatar.cc/150?u=3' },
            { name: 'Zoya', role: 'Dev Ops', img: 'https://i.pravatar.cc/150?u=4' },
          ].map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-md text-center"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4 border-2 border-green-600"
              />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-200">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 max-w-3xl mx-auto"
      >
        <blockquote className="italic text-green-700 dark:text-green-300 text-xl">
          “The best time to plant a tree was 20 years ago. The second best time is now.” 🌳
        </blockquote>
      </motion.div>
    </div>
  );
};

export default About;
