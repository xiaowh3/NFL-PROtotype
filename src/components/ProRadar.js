import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function ProRadar(props) {

  const data = [
    {
      subject: "40 Yard",
      A: 200 - (props.data['40_yard_dash'] / 4.5) * 100,
      fullMark: 100
    },
    {
      subject: "Broad",
      A: (props.data['broad_jump'] / 147) * 100,
      fullMark: 100
    },
    {
      subject: "Cone",
      A: 200 - (props.data['cone'] / 6.28) * 100,
      fullMark: 100
    },
    {
      subject: "Shuttle",
      A: 200 - (props.data['shuttle'] / 3.72) * 100,
      fullMark: 100
    },
    {
      subject: "Vertical",
      A: (props.data['vertical_jump'] / 35) * 100,
      fullMark: 100
    }
  ];

  return (
    <ResponsiveContainer width='100%' height={300}>
    <RadarChart
      data={data}
      outerRadius='60%'
      // width={320}
      // height={300}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Pro"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.8}
      />
    </RadarChart>
    </ResponsiveContainer>
  );
}
