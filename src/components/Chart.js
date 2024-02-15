import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Chart = ({ data }) => {
  const COLORS = ['#52D3D8', '#3887BE', '#38419D', '#200E3A'];

  return (
    <div style={{ display: 'flex', flexDirection: 'row'}}>
      <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <ResponsiveContainer width="100%" height={370}>
          <BarChart
            data={data}
            margin={{
              top: 20, right: 50, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontFamily: 'Century Gothic', fontSize: 15 }} />
            <YAxis tick={{ fontFamily: 'Century Gothic', fontSize: 15 }} />
            <Tooltip labelStyle={{ fontFamily: 'Arial', fontSize: 14 }} />
            <Legend wrapperStyle={{ fontFamily: 'Century Gothic', fontSize: 15 }} />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10, marginLeft: 20, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip labelStyle={{ fontFamily: 'Century Gothic', fontSize: 14 }} />
            <Legend wrapperStyle={{ fontFamily: 'Century Gothic', fontSize: 15 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
