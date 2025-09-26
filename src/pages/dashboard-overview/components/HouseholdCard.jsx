import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HouseholdCard = () => {
  // Mock household data
  const householdData = {
    name: "Green Valley Residence",
    id: "HH-2024-0157",
    address: "123 Eco Street, Green Valley District, Metro City 10001",
    members: [
      {
        id: 1,
        name: "John Smith",
        role: "Head of Household",
        joinedDate: "2023-01-15",
        status: "active"
      },
      {
        id: 2,
        name: "Sarah Smith",
        role: "Member",
        joinedDate: "2023-01-15",
        status: "active"
      },
      {
        id: 3,
        name: "Emma Smith",
        role: "Member",
        joinedDate: "2023-06-20",
        status: "active"
      },
      {
        id: 4,
        name: "Michael Smith",
        role: "Member",
        joinedDate: "2024-01-10",
        status: "active"
      }
    ]
  };

  return (
    <motion.div 
      className="gradient-card border border-gray-200/60 rounded-2xl p-4 sm:p-6 shadow-mobile-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-3 mb-6">
        <motion.div 
          className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-inner-glow"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <Icon name="Home" size={20} className="text-white" />
        </motion.div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">🏠 Household Information</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Household Details */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200/60">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Household Name</label>
            <p className="text-gray-900 font-bold text-lg mt-1">{householdData?.name}</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200/60">
            <label className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Household ID</label>
            <p className="text-gray-900 font-mono font-bold mt-1">{householdData?.id}</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200/60">
            <label className="text-xs font-semibold text-green-600 uppercase tracking-wide">Address</label>
            <p className="text-gray-700 font-medium mt-1 leading-relaxed">{householdData?.address}</p>
          </div>
        </motion.div>

        {/* Registered Members */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">👥 Registered Members</label>
            <motion.span 
              className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {householdData?.members?.length} Members
            </motion.span>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            {householdData?.members?.map((member, index) => (
              <motion.div 
                key={member?.id} 
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner-glow">
                  <Icon name="User" size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{member?.name}</p>
                  <p className="text-xs text-gray-600 font-medium">{member?.role}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-sm ${
                    member?.status === 'active' ? 'bg-green-500 animate-pulse-soft' : 'bg-gray-400'
                  }`} />
                  <span className={`text-xs font-semibold capitalize ${
                    member?.status === 'active' ? 'text-green-600' : 'text-gray-500'
                  }`}>{member?.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HouseholdCard;