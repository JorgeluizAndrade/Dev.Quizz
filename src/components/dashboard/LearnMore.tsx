"use client";

import { useState, useMemo } from "react";
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
  Tooltip,
  Button,
} from "@nextui-org/react";
import { GraduationCap, Info, ExternalLink, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const rows = [
  {
    key: "1",
    author: "Oleksii Trekhleb",
    nameRepo: "javascript-algorithms",
    difficulty: "Beginner",
    githubLink: "https://github.com/trekhleb/javascript-algorithms",
    description: "JavaScript algorithms and data structures for beginners",
    stars: 175000,
  },
  {
    key: "2",
    author: "Maxim Zhukov",
    nameRepo: "typescript-algorithms",
    difficulty: "Intermediate",
    githubLink: "https://github.com/FSou1/typescript-algorithms",
    description:
      "TypeScript implementation of common data structures and algorithms",
    stars: 1200,
  },
  {
    key: "3",
    author: "Subhampreet Mohanty",
    nameRepo: "Project-Ideas-And-Resources",
    difficulty: "Intermediate",
    githubLink:
      "https://github.com/The-Cool-Coders/Project-Ideas-And-Resources",
    description: "A collection of project ideas for developers of all levels",
    stars: 2500,
  },
  {
    key: "4",
    author: "Kamran Ahmed",
    nameRepo: "developer-roadmap",
    difficulty: "Beginner",
    githubLink: "https://github.com/kamranahmedse/developer-roadmap",
    description:
      "Interactive roadmaps, guides and other educational content for developers",
    stars: 250000,
  },
  {
    key: "5",
    author: "Kamran Ahmed",
    nameRepo: "design-patterns-for-humans",
    difficulty: "Intermediate",
    githubLink: "https://github.com/kamranahmedse/design-patterns-for-humans",
    description:
      "Design patterns explained in simple terms with real-world examples",
    stars: 38000,
  },
  {
    key: "6",
    author: "Axel Baudot",
    nameRepo: "project-based-learning",
    difficulty: "Beginner",
    githubLink: "https://github.com/practical-tutorials/project-based-learning",
    description:
      "A list of programming tutorials in which learners build an application from scratch",
    stars: 120000,
  },
  {
    key: "7",
    author: "John Washam",
    nameRepo: "coding-interview-university",
    difficulty: "Beginner",
    githubLink: "https://github.com/jwasham/coding-interview-university",
    description:
      "A complete computer science study plan to become a software engineer",
    stars: 270000,
  },
  {
    key: "8",
    author: "Various Contributors",
    nameRepo: "Project Based Learning",
    difficulty: "Beginner",
    githubLink: "https://github.com/practical-tutorials/project-based-learning",
    description: "Curated list of project-based tutorials",
    stars: 120000,
  },
];

const columns = [
  { key: "author", label: "AUTHOR" },
  { key: "nameRepo", label: "REPOSITORY" },
  { key: "difficulty", label: "DIFFICULTY" },
  { key: "stars", label: "STARS" },
  { key: "actions", label: "ACTIONS" },
];

const LearnMore = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const { theme } = useTheme();
  const rowsPerPage = 4;

  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return rows.slice(start, end);
  }, [page]);

  const formatStars = (stars: number) => {
    return stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars.toString();
  };

  const toggleRepo = (itemKey: string) => {
    setSelectedRepo((prev) => (prev === itemKey ? null : itemKey));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card className="w-full">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap size={24} className="text-primary" />
            <h2 className="text-2xl font-bold">Learn More</h2>
          </div>
          <Tooltip content="Explore these educational resources to enhance your programming skills">
            <Button isIconOnly variant="light" aria-label="Information">
              <Info size={20} />
            </Button>
          </Tooltip>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-sm mb-4">
            Discover valuable GitHub repositories to boost your learning
            journey.
          </p>
          <Table
            aria-label="Educational GitHub Repositories"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames={{
              wrapper: "min-h-[222px]",
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  align={column.key === "actions" ? "center" : "start"}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow
                  key={item.key}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "nameRepo" ? (
                        <a
                          href={item.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          {item.nameRepo}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      ) : columnKey === "difficulty" ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.difficulty === "Beginner"
                              ? "bg-green-100 text-green-800"
                              : item.difficulty === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.difficulty}
                        </span>
                      ) : columnKey === "stars" ? (
                        <div className="flex items-center">
                          <Star size={14} className="mr-1 text-yellow-400" />
                          {formatStars(item.stars)}
                        </div>
                      ) : columnKey === "actions" ? (
                        <Button
                          size="sm"
                          variant="flat"
                          color="secondary"
                          onClick={() => toggleRepo(item.key)}
                        >
                            Show Info
                        </Button>
                      ) : (
                        item[columnKey as keyof typeof item]
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      {selectedRepo && (
        <motion.div
          key={selectedRepo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {rows.find((r) => r.key === selectedRepo)?.nameRepo}
                </h3>
                <Button
                  size="sm"
                  variant="flat"
                  color="danger"
                  onClick={() => setSelectedRepo(null)}
                >
                  Hide Info
                </Button>
              </div>
              <p className="text-sm mt-2">
                {rows.find((r) => r.key === selectedRepo)?.description}
              </p>
            </CardBody>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LearnMore;
