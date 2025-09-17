'use client'
import { useState, useEffect, useMemo } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Clock, ExternalLink, } from "lucide-react";


// TypeScript interfaces
interface SubTopic {
    name: string;
    leetCodeLink: string;
    youTubeLink: string;
    articleLink: string;
    level: 'EASY' | 'MEDIUM' | 'HARD';
    status: 'Done' | 'Pending';
    completed: boolean;
}

interface Topic {
    title: string;
    status: string;
    color: string;
    subTopics: SubTopic[];
}

interface TopicsData {
    [key: string]: Topic;
}

interface ExpandedSections {
    [key: string]: boolean;
}
interface ProgressData {
    easy: { completed: number; total: number; percentage: number };
    medium: { completed: number; total: number; percentage: number };
    hard: { completed: number; total: number; percentage: number };
}

export default function TopicsPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        algorithms: true,
        dataStructures: false,
        databases: false,
        machineLearning: false,
        operatingSystems: false,
        networks: false
    });

    const [topicsData, setTopicsData] = useState<TopicsData>({
        algorithms: {
            title: "Algorithms",
            status: "Pending",
            color: "bg-cyan-400",
            subTopics: [
                {
                    name: "Sorting Algorithms",
                    leetCodeLink: "https://leetcode.com/tag/sorting/",
                    youTubeLink: "https://youtube.com/watch?v=example1",
                    articleLink: "https://example.com/sorting",
                    level: "EASY",
                    status: "Done",
                    completed: true
                },
                {
                    name: "Searching Algorithms",
                    leetCodeLink: "https://leetcode.com/tag/binary-search/",
                    youTubeLink: "https://youtube.com/watch?v=example2",
                    articleLink: "https://example.com/searching",
                    level: "EASY",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Dynamic Programming",
                    leetCodeLink: "https://leetcode.com/tag/dynamic-programming/",
                    youTubeLink: "https://youtube.com/watch?v=example3",
                    articleLink: "https://example.com/dp",
                    level: "MEDIUM",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Greedy Algorithms",
                    leetCodeLink: "https://leetcode.com/tag/greedy/",
                    youTubeLink: "https://youtube.com/watch?v=example4",
                    articleLink: "https://example.com/greedy",
                    level: "MEDIUM",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Divide and Conquer",
                    leetCodeLink: "https://leetcode.com/tag/divide-and-conquer/",
                    youTubeLink: "https://youtube.com/watch?v=example5",
                    articleLink: "https://example.com/divide",
                    level: "MEDIUM",
                    status: "Done",
                    completed: true
                },
                {
                    name: "Backtracking",
                    leetCodeLink: "https://leetcode.com/tag/backtracking/",
                    youTubeLink: "https://youtube.com/watch?v=example6",
                    articleLink: "https://example.com/backtracking",
                    level: "HARD",
                    status: "Pending",
                    completed: false
                }
            ]
        },
        dataStructures: {
            title: "Data Structures",
            status: "Pending",
            color: "bg-purple-400",
            subTopics: [
                {
                    name: "Arrays and Strings",
                    leetCodeLink: "https://leetcode.com/tag/array/",
                    youTubeLink: "https://youtube.com/watch?v=arrays",
                    articleLink: "https://example.com/arrays",
                    level: "EASY",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Linked Lists",
                    leetCodeLink: "https://leetcode.com/tag/linked-list/",
                    youTubeLink: "https://youtube.com/watch?v=linkedlist",
                    articleLink: "https://example.com/linkedlist",
                    level: "EASY",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Trees and Graphs",
                    leetCodeLink: "https://leetcode.com/tag/tree/",
                    youTubeLink: "https://youtube.com/watch?v=trees",
                    articleLink: "https://example.com/trees",
                    level: "MEDIUM",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Advanced Trees",
                    leetCodeLink: "https://leetcode.com/tag/tree/",
                    youTubeLink: "https://youtube.com/watch?v=advtrees",
                    articleLink: "https://example.com/advtrees",
                    level: "HARD",
                    status: "Pending",
                    completed: false
                }
            ]
        },
        databases: {
            title: "Databases",
            status: "Pending",
            color: "bg-green-400",
            subTopics: [
                {
                    name: "SQL Fundamentals",
                    leetCodeLink: "https://leetcode.com/studyplan/top-sql-50/",
                    youTubeLink: "https://youtube.com/watch?v=sql",
                    articleLink: "https://example.com/sql",
                    level: "EASY",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Query Optimization",
                    leetCodeLink: "#",
                    youTubeLink: "https://youtube.com/watch?v=optimization",
                    articleLink: "https://example.com/optimization",
                    level: "MEDIUM",
                    status: "Pending",
                    completed: false
                },
                {
                    name: "Database Design",
                    leetCodeLink: "#",
                    youTubeLink: "https://youtube.com/watch?v=design",
                    articleLink: "https://example.com/design",
                    level: "HARD",
                    status: "Pending",
                    completed: false
                }
            ]
        }
    });

    useEffect(() => {
        setMounted(true);

    }, []);

    useEffect(() => {
        if (!mounted) return;
        setLoading(false);
    }, [mounted]);

    const toggleSection = (section: string): void => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const toggleSubTopicCompletion = (topicKey: string, subTopicIndex: number): void => {
        setTopicsData(prev => ({
            ...prev,
            [topicKey]: {
                ...prev[topicKey],
                subTopics: prev[topicKey].subTopics.map((subTopic, index) =>
                    index === subTopicIndex
                        ? {
                            ...subTopic,
                            completed: !subTopic.completed,
                            status: !subTopic.completed ? 'Done' : 'Pending'
                        }
                        : subTopic
                )
            }
        }));
    };

    const progress = useMemo((): ProgressData => {
        const allSubTopics: SubTopic[] = Object.values(topicsData).flatMap(topic => topic.subTopics);

        const easyTopics = allSubTopics.filter(subTopic => subTopic.level === 'EASY');
        const mediumTopics = allSubTopics.filter(subTopic => subTopic.level === 'MEDIUM');
        const hardTopics = allSubTopics.filter(subTopic => subTopic.level === 'HARD');

        const easyCompleted = easyTopics.filter(subTopic => subTopic.completed).length;
        const mediumCompleted = mediumTopics.filter(subTopic => subTopic.completed).length;
        const hardCompleted = hardTopics.filter(subTopic => subTopic.completed).length;

        const calculatePercentage = (completed: number, total: number): number => {
            return total > 0 ? Math.round((completed / total) * 100) : 0;
        };

        return {
            easy: {
                completed: easyCompleted,
                total: easyTopics.length,
                percentage: calculatePercentage(easyCompleted, easyTopics.length)
            },
            medium: {
                completed: mediumCompleted,
                total: mediumTopics.length,
                percentage: calculatePercentage(mediumCompleted, mediumTopics.length)
            },
            hard: {
                completed: hardCompleted,
                total: hardTopics.length,
                percentage: calculatePercentage(hardCompleted, hardTopics.length)
            }
        };
    }, [topicsData]);

    useEffect(() => {
        localStorage.setItem('essay', JSON.stringify(progress.easy.percentage))
        localStorage.setItem('Meduim', JSON.stringify(progress.easy.percentage))
        localStorage.setItem('hard', JSON.stringify(progress.easy.percentage))

    })

    const getLevelColor = (level: SubTopic['level']): string => {
        switch (level) {
            case 'EASY': return 'text-green-600 bg-green-100';
            case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
            case 'HARD': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    if (!mounted || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-blue-600 mb-2">Topics</h2>
                    <p className="text-gray-600">Explore these exciting topics!</p>
                </div>
                {/* Topics Sections */}
                <div className="space-y-4">
                    {Object.entries(topicsData).map(([key, topic]) => (
                        <div key={key} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            {/* Section Header */}
                            <div
                                className={`${topic.color} p-4 cursor-pointer flex justify-between items-center`}
                                onClick={() => toggleSection(key)}
                            >
                                <div className="flex items-center space-x-3">
                                    <h3 className="text-white font-semibold text-lg">{topic.title}</h3>
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                                        {topic.status}
                                    </span>
                                </div>
                                {expandedSections[key] ?
                                    <ChevronUp className="text-white w-5 h-5" /> :
                                    <ChevronDown className="text-white w-5 h-5" />
                                }
                            </div>

                            {/* Expandable Content */}
                            {expandedSections[key] && (
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Sub Topics</h4>

                                    {/* Table */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="border p-3 text-left">Name</th>
                                                    <th className="border p-3 text-center">LeetCode Link</th>
                                                    <th className="border p-3 text-center">YouTube Link</th>
                                                    <th className="border p-3 text-center">Article Link</th>
                                                    <th className="border p-3 text-center">Level</th>
                                                    <th className="border p-3 text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {topic.subTopics.map((subTopic: SubTopic, index: number) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="border p-3">
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    onClick={() => toggleSubTopicCompletion(key, index)}
                                                                    className="flex-shrink-0"
                                                                >
                                                                    {subTopic.completed ?
                                                                        <CheckCircle className="w-4 h-4 text-green-500 hover:text-green-600 cursor-pointer" /> :
                                                                        <div className="w-4 h-4 border-2 border-gray-300 rounded hover:border-gray-400 cursor-pointer"></div>
                                                                    }
                                                                </button>
                                                                <span className={subTopic.completed ? 'line-through text-gray-500' : ''}>
                                                                    {subTopic.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="border p-3 text-center">
                                                            <a
                                                                href={subTopic.leetCodeLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                                            >
                                                                Practice <ExternalLink className="w-3 h-3 ml-1" />
                                                            </a>
                                                        </td>
                                                        <td className="border p-3 text-center">
                                                            <a
                                                                href={subTopic.youTubeLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                                            >
                                                                Watch <ExternalLink className="w-3 h-3 ml-1" />
                                                            </a>
                                                        </td>
                                                        <td className="border p-3 text-center">
                                                            <a
                                                                href={subTopic.articleLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                                                            >
                                                                Read <ExternalLink className="w-3 h-3 ml-1" />
                                                            </a>
                                                        </td>
                                                        <td className="border p-3 text-center">
                                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(subTopic.level)}`}>
                                                                {subTopic.level}
                                                            </span>
                                                        </td>
                                                        <td className="border p-3 text-center">
                                                            <div className="flex items-center justify-center">
                                                                {subTopic.status === 'Done' ?
                                                                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" /> :
                                                                    <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                                                                }
                                                                <span className={`${subTopic.status === 'Done' ? 'text-green-600' : 'text-yellow-600'} font-semibold`}>
                                                                    {subTopic.status}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
// 'use client'
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { ChevronDown, ChevronUp, CheckCircle, Clock, ExternalLink } from "lucide-react";

// // TypeScript interfaces
// interface SubTopic {
//     name: string;
//     leetCodeLink: string;
//     youTubeLink: string;
//     articleLink: string;
//     level: 'EASY' | 'MEDIUM' | 'HARD';
//     status: 'Done' | 'Pending';
//     completed: boolean;
// }

// interface Topic {
//     title: string;
//     status: string;
//     color: string;
//     subTopics: SubTopic[];
// }

// interface TopicsData {
//     [key: string]: Topic;
// }

// interface ExpandedSections {
//     [key: string]: boolean;
// }

// export default function TopicsPage() {
//     const [loading, setLoading] = useState<boolean>(true);
//     const [mounted, setMounted] = useState<boolean>(false);
//     const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
//         algorithms: true, // Algorithms expanded by default
//         dataStructures: false,
//         databases: false,
//         machineLearning: false,
//         operatingSystems: false,
//         networks: false
//     });


//     // Mock data - replace with your API call
//     const topicsData: TopicsData = {
//         algorithms: {
//             title: "Algorithms",
//             status: "Pending",
//             color: "bg-cyan-400",
//             subTopics: [
//                 {
//                     name: "Sorting Algorithms",
//                     leetCodeLink: "https://leetcode.com/tag/sorting/",
//                     youTubeLink: "https://youtube.com/watch?v=example1",
//                     articleLink: "https://example.com/sorting",
//                     level: "EASY",
//                     status: "Done",
//                     completed: true
//                 },
//                 {
//                     name: "Searching Algorithms",
//                     leetCodeLink: "https://leetcode.com/tag/binary-search/",
//                     youTubeLink: "https://youtube.com/watch?v=example2",
//                     articleLink: "https://example.com/searching",
//                     level: "EASY",
//                     status: "Pending",
//                     completed: false
//                 },
//                 {
//                     name: "Dynamic Programming",
//                     leetCodeLink: "https://leetcode.com/tag/dynamic-programming/",
//                     youTubeLink: "https://youtube.com/watch?v=example3",
//                     articleLink: "https://example.com/dp",
//                     level: "MEDIUM",
//                     status: "Pending",
//                     completed: false
//                 },
//                 {
//                     name: "Greedy Algorithms",
//                     leetCodeLink: "https://leetcode.com/tag/greedy/",
//                     youTubeLink: "https://youtube.com/watch?v=example4",
//                     articleLink: "https://example.com/greedy",
//                     level: "MEDIUM",
//                     status: "Pending",
//                     completed: false
//                 },
//                 {
//                     name: "Divide and Conquer",
//                     leetCodeLink: "https://leetcode.com/tag/divide-and-conquer/",
//                     youTubeLink: "https://youtube.com/watch?v=example5",
//                     articleLink: "https://example.com/divide",
//                     level: "MEDIUM",
//                     status: "Done",
//                     completed: true
//                 },
//                 {
//                     name: "Backtracking",
//                     leetCodeLink: "https://leetcode.com/tag/backtracking/",
//                     youTubeLink: "https://youtube.com/watch?v=example6",
//                     articleLink: "https://example.com/backtracking",
//                     level: "HARD",
//                     status: "Pending",
//                     completed: false
//                 }
//             ]
//         },
//         dataStructures: {
//             title: "Data Structures",
//             status: "Pending",
//             color: "bg-cyan-400",
//             subTopics: [
//                 {
//                     name: "Arrays and Strings",
//                     leetCodeLink: "https://leetcode.com/tag/array/",
//                     youTubeLink: "https://youtube.com/watch?v=arrays",
//                     articleLink: "https://example.com/arrays",
//                     level: "EASY",
//                     status: "Pending",
//                     completed: false
//                 },
//                 {
//                     name: "Linked Lists",
//                     leetCodeLink: "https://leetcode.com/tag/linked-list/",
//                     youTubeLink: "https://youtube.com/watch?v=linkedlist",
//                     articleLink: "https://example.com/linkedlist",
//                     level: "EASY",
//                     status: "Pending",
//                     completed: false
//                 }
//             ]
//         },
//         databases: {
//             title: "Databases",
//             status: "Pending",
//             color: "bg-cyan-400",
//             subTopics: [
//                 {
//                     name: "SQL Fundamentals",
//                     leetCodeLink: "https://leetcode.com/studyplan/top-sql-50/",
//                     youTubeLink: "https://youtube.com/watch?v=sql",
//                     articleLink: "https://example.com/sql",
//                     level: "EASY",
//                     status: "Pending",
//                     completed: false
//                 }
//             ]
//         },
//         machineLearning: {
//             title: "Machine Learning",
//             status: "Pending",
//             color: "bg-cyan-400",
//             subTopics: [
//                 {
//                     name: "Linear Regression",
//                     leetCodeLink: "#",
//                     youTubeLink: "https://youtube.com/watch?v=ml",
//                     articleLink: "https://example.com/ml",
//                     level: "MEDIUM",
//                     status: "Pending",
//                     completed: false
//                 }
//             ]
//         },
//         operatingSystems: {
//             title: "Operating Systems",
//             status: "Pending",
//             color: "bg-cyan-400",
//             subTopics: [
//                 {
//                     name: "Process Management",
//                     leetCodeLink: "#",
//                     youTubeLink: "https://youtube.com/watch?v=os",
//                     articleLink: "https://example.com/os",
//                     level: "MEDIUM",
//                     status: "Pending",
//                     completed: false
//                 }
//             ]
//         },
//         networks: {
//             title: "Networks",
//             status: "Pending",
//             color: "bg-cyan-400",
//             subTopics: [
//                 {
//                     name: "TCP/IP Protocol",
//                     leetCodeLink: "#",
//                     youTubeLink: "https://youtube.com/watch?v=network",
//                     articleLink: "https://example.com/network",
//                     level: "MEDIUM",
//                     status: "Pending",
//                     completed: false
//                 }
//             ]
//         }
//     };

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     useEffect(() => {
//         if (!mounted) return;
//         setLoading(false);
//     }, [mounted]);

//     const toggleSection = (section: string): void => {
//         setExpandedSections(prev => ({
//             ...prev,
//             [section]: !prev[section]
//         }));
//     };

//     const getLevelColor = (level: SubTopic['level']): string => {
//         switch (level) {
//             case 'EASY': return 'text-green-600 bg-green-100';
//             case 'MEDIUM': return 'text-yellow-600 bg-yellow-100';
//             case 'HARD': return 'text-red-600 bg-red-100';
//             default: return 'text-gray-600 bg-gray-100';
//         }
//     };

//     if (!mounted || loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-xl">Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="max-w-6xl mx-auto p-6">
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-bold text-blue-600 mb-2">Topics</h2>
//                     <p className="text-gray-600">Explore these exciting topics!</p>
//                 </div>

//                 {/* Topics Sections */}
//                 <div className="space-y-4">
//                     {Object.entries(topicsData).map(([key, topic]) => (
//                         <div key={key} className="bg-white rounded-lg shadow-sm overflow-hidden">
//                             {/* Section Header */}
//                             <div
//                                 className={`${topic.color} p-4 cursor-pointer flex justify-between items-center`}
//                                 onClick={() => toggleSection(key)}
//                             >
//                                 <div className="flex items-center space-x-3">
//                                     <h3 className="text-white font-semibold text-lg">{topic.title}</h3>
//                                     <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
//                                         {topic.status}
//                                     </span>
//                                 </div>
//                                 {expandedSections[key] ?
//                                     <ChevronUp className="text-white w-5 h-5" /> :
//                                     <ChevronDown className="text-white w-5 h-5" />
//                                 }
//                             </div>

//                             {/* Expandable Content */}
//                             {expandedSections[key] && (
//                                 <div className="p-4">
//                                     <h4 className="text-lg font-semibold text-gray-800 mb-4">Sub Topics</h4>

//                                     {/* Table */}
//                                     <div className="overflow-x-auto">
//                                         <table className="w-full border-collapse">
//                                             <thead>
//                                                 <tr className="bg-gray-50">
//                                                     <th className="border p-3 text-left">Name</th>
//                                                     <th className="border p-3 text-center">LeetCode Link</th>
//                                                     <th className="border p-3 text-center">YouTube Link</th>
//                                                     <th className="border p-3 text-center">Article Link</th>
//                                                     <th className="border p-3 text-center">Level</th>
//                                                     <th className="border p-3 text-center">Status</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {topic.subTopics.map((subTopic: SubTopic, index: number) => (
//                                                     <tr key={index} className="hover:bg-gray-50">
//                                                         <td className="border p-3">
//                                                             <div className="flex items-center space-x-2">
//                                                                 {subTopic.completed ?
//                                                                     <CheckCircle className="w-4 h-4 text-green-500" /> :
//                                                                     <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
//                                                                 }
//                                                                 <span>{subTopic.name}</span>
//                                                             </div>
//                                                         </td>
//                                                         <td className="border p-3 text-center">
//                                                             <Link
//                                                                 href={subTopic.leetCodeLink}
//                                                                 target="_blank"
//                                                                 rel="noopener noreferrer"
//                                                                 className="text-blue-600 hover:text-blue-800 inline-flex items-center"
//                                                             >
//                                                                 Practice <ExternalLink className="w-3 h-3 ml-1" />
//                                                             </Link>
//                                                         </td>
//                                                         <td className="border p-3 text-center">
//                                                             <Link
//                                                                 href={subTopic.youTubeLink}
//                                                                 target="_blank"
//                                                                 rel="noopener noreferrer"
//                                                                 className="text-blue-600 hover:text-blue-800 inline-flex items-center"
//                                                             >
//                                                                 Watch <ExternalLink className="w-3 h-3 ml-1" />
//                                                             </Link>
//                                                         </td>
//                                                         <td className="border p-3 text-center">
//                                                             <Link
//                                                                 href={subTopic.articleLink}
//                                                                 target="_blank"
//                                                                 rel="noopener noreferrer"
//                                                                 className="text-blue-600 hover:text-blue-800 inline-flex items-center"
//                                                             >
//                                                                 Read <ExternalLink className="w-3 h-3 ml-1" />
//                                                             </Link>
//                                                         </td>
//                                                         <td className="border p-3 text-center">
//                                                             <span className={`px-2 py-1 rounded text-xs font-semibold ${getLevelColor(subTopic.level)}`}>
//                                                                 {subTopic.level}
//                                                             </span>
//                                                         </td>
//                                                         <td className="border p-3 text-center">
//                                                             <div className="flex items-center justify-center">
//                                                                 {subTopic.status === 'Done' ?
//                                                                     <span className="text-green-600 font-semibold">Done</span> :
//                                                                     <Clock className="w-4 h-4 text-yellow-500" />
//                                                                 }
//                                                                 <span className={`ml-1 ${subTopic.status === 'Done' ? 'text-green-600' : 'text-yellow-600'} font-semibold`}>
//                                                                     {subTopic.status}
//                                                                 </span>
//                                                             </div>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }