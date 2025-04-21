"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

const RecentActivitiesComponents = ({ header, text, children }: any) => {
  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
      <Card className="col-span-4 lg:col-span-3">
        <CardHeader className="text-2xl font-bold">{header}</CardHeader>
        <Divider />
        <CardBody>
          <a
            href="/history"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center"
          >
            {text}
            
          </a>
        </CardBody>
        <Divider />
        <CardBody className="max-h-[60vh] overflow-scroll">{children}</CardBody>
      </Card>
    </motion.div>
  );
};

export default RecentActivitiesComponents;
