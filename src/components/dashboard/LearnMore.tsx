"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const rows = [
  {
    key: "1",
    author: "Oleksii Trekhleb",
    NameRepo: "javascript-algorithms",
    difficulty: "Beginner",
    githubLink: "https://github.com/trekhleb/javascript-algorithms",
  },
  {
    key: "2",
    author: "Maxim Zhukov",
    NameRepo: "typescript-algorithms",
    difficulty: "Intermediate",
    githubLink: "https://github.com/FSou1/typescript-algorithms",
  },
  {
    key: "3",
    author: "Subhampreet Mohanty",
    NameRepo: "Project-Ideas-And-Resources",
    difficulty: "Intermediate",
    githubLink:
      "https://github.com/The-Cool-Coders/Project-Ideas-And-Resources",
  },
  {
    key: "4",
    author: "Kamran Ahmed",
    NameRepo: "developer-roadmap",
    difficulty: "Beginner",
    githubLink: "https://github.com/kamranahmedse/developer-roadmap",
  },
  {
    key: "5",
    author: "Kamran Ahmed",
    NameRepo: "design-patterns-for-humans ",
    difficulty: "Intermediate",
    githubLink: "https://github.com/kamranahmedse/design-patterns-for-humans",
  },
  {
    key: "6",
    author: "Axel Baudot",
    NameRepo: "project-based-learning",
    difficulty: "Beginner",
    githubLink: "https://github.com/practical-tutorials/project-based-learning",
  },
  {
    key: "7",
    author: "John Washam",
    NameRepo: "coding-interview-university",
    difficulty: "Beginner",
    githubLink: "https://github.com/jwasham/coding-interview-university",
  },
  {
    key: "8",
    author: "Free Ebook Foundation",
    NameRepo: "free-programming-books",
    difficulty: "Beginner",
    githubLink: "https://github.com/EbookFoundation/free-programming-books",
  },
];

const columns = [
  {
    key: "author",
    label: "AUTHOR",
  },
  {
    key: "NameRepo",
    label: "NAME REPOSITORY",
  },
  {
    key: "difficulty",
    label: "DIFFICULTY",
  },
];

const LearnMore = () => {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page]);

  return (
    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
      <Card className="col-span-4 lg:col-span-3 w-[500px] ">
        <CardHeader className="">
          <h2 className="text-2xl font-bold">Learn More</h2>
          <GraduationCap size={20} strokeWidth={2.5} />
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-sm">GitHub Repositories.</p>
        </CardBody>

        <Table
          className="col-span-4"
          aria-label="Learn More"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "NameRepo" ? (
                      <a
                        href={item.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {item.NameRepo}
                      </a>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default LearnMore;
