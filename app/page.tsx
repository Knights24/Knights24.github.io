"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Download,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Award,
  GraduationCap,
  User,
  FolderOpen,
  Trophy,
  Users,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

type Page = "Home" | "Projects" | "About" | "Academics" | "Achievements" | "Extra-Curriculars" | "Contact"

export default function VivekVishwakarmaPortfolio() {
  const [currentTime, setCurrentTime] = useState("")
  const [currentDate, setCurrentDate] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentPage, setCurrentPage] = useState<Page>("Home")

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      const date = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })

      setCurrentTime(time)
      setCurrentDate(`${date.split(" ")[1]} ${date.split(" ")[0]}, ${date.split(" ")[2]}`)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const navigationItems = [
    { name: "Home" as Page, icon: User },
    { name: "Projects" as Page, icon: FolderOpen },
    { name: "About" as Page, icon: User },
    { name: "Academics" as Page, icon: GraduationCap },
    { name: "Achievements" as Page, icon: Trophy },
    { name: "Extra-Curriculars" as Page, icon: Users },
    { name: "Contact" as Page, icon: MessageCircle },
  ]

  const projects = [
    {
      title: "IntraKart (AR/VR + AI Interior App)",
      description:
        "AI-powered AR/VR interior design app that allows real-time visualization of furniture in user spaces. Awarded 3rd prize at ISTE Ideation '24 for innovation and presentation.",
      technologies: ["Unity", "Python", "Firebase", "OpenCV", "ARKit"],
      github: "https://github.com/vivek/intrakart",
    },
    {
      title: "Clapwise (Service App)",
      description:
        "Urban Company-style booking app connecting users to home service professionals with geolocation, chat, and secure booking.",
      technologies: ["Flutter", "Firebase", "Node.js", "Maps API"],
      github: "https://github.com/vivek/clapwise",
    },
  ]

  const achievements = [
    {
      title: "3rd Prize - ISTE Ideation '24",
      organization: "ISTE National Competition",
      date: "Nov 2024",
      description: "IntraKart AR/VR Interior App won 3rd prize for innovation and presentation",
    },
  ]

  const academics = [
    {
      degree: "Bachelor of Technology",
      field: "Information Technology",
      institution: "SAL Engineering and Technical Institute (GTU)",
      duration: "2023 - 2027 (Expected)",
      coursework: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Structures & Algorithms",
        "Database Management",
        "Computer Networks",
        "Software Engineering",
        "Web Development",
        "Mobile App Development",
      ],
    },
  ]

  const extraCurriculars = [
    {
      activity: "Technical Head",
      organization: "ISTE SAL Chapter",
      duration: "2024 - Present",
      description:
        "Leading technical workshops and mentoring students in AI/ML and software development",
    },
  ]


const handleDownloadCV = () => {
  const link = document.createElement("a")
  link.href = "https://Knights24.github.io/public/VivekVishwakarma.pdf"
  link.download = "Vivek_Vishwakarma_CV.pdf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! I'll get back to you soon.")
  }

  const renderContent = () => {
    switch (currentPage) {
      case "Home":
        return (
          <div className="flex-1 flex items-center justify-center px-8 animate-fadeIn">
            <div className="max-w-2xl text-center">
              <h1
                className={`text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-6 animate-slideUp font-mono ${
                  isDarkMode
                    ? "from-purple-400 via-purple-500 to-indigo-400"
                    : "from-purple-600 via-purple-700 to-indigo-600"
                }`}
              >
                Vivek Vishwakarma
              </h1>
              <h2
                className={`text-xl mb-8 animate-slideUp delay-75 transition-colors duration-300 font-mono ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                AI/ML Engineer | Web Developer | Tech Head @ ISTE SAL
              </h2>
              <p
                className={`leading-relaxed mb-12 max-w-xl mx-auto animate-slideUp delay-150 transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Passionate about building intelligent systems and innovative web applications. Focused on creating
                AI-powered solutions that solve real-world problems.
              </p>
              <div className="flex items-center justify-center gap-4 animate-slideUp delay-225">
                <Button
                  onClick={() => setCurrentPage("Projects")}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-md flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-mono"
                >
                  View Projects
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleDownloadCV}
                  variant="outline"
                  className="px-6 py-3 rounded-md flex items-center gap-2 transform hover:scale-105 transition-all duration-200 border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400 bg-transparent font-mono"
                >
                  Download CV
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )

      case "Projects":
        return (
          <div className="flex-1 p-8 animate-fadeIn">
            <div className="max-w-6xl mx-auto">
              <h1
                className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8 animate-slideUp font-mono ${
                  isDarkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-indigo-600"
                }`}
              >
                My Projects
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <Card
                    key={index}
                    className={`backdrop-blur-sm hover:shadow-lg transition-all duration-200 animate-slideUp hover-lift ${
                      isDarkMode
                        ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                        : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                    }`}
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent text-lg font-mono">
                        {project.title}
                      </CardTitle>
                      <CardDescription className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} text-sm`}>
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className={`text-xs border transition-colors duration-200 font-mono ${
                              isDarkMode
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30"
                                : "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200"
                            }`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="hover:bg-purple-500/10 transition-colors duration-200 bg-transparent border-purple-500/50 text-purple-300 hover:border-purple-400 font-mono"
                        >
                          <Link href={project.github} target="_blank">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "About":
        return (
          <div className="flex-1 p-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <h1
                className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8 animate-slideUp font-mono ${
                  isDarkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-indigo-600"
                }`}
              >
                About Me
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card
                    className={`backdrop-blur-sm hover:shadow-lg transition-all duration-200 animate-slideUp hover-lift ${
                      isDarkMode
                        ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                        : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                    }`}
                  >
                    <CardContent className="p-6">
                      <h2
                        className={`text-2xl font-semibold mb-4 font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                      >
                        Hello! I'm Vivek Vishwakarma
                      </h2>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-4`}>
                        I'm Vivek, a BTech IT student at SAL Engineering and Technical Institute (GTU), currently
                        focused on becoming an AI/ML Engineer.
                      </p>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed mb-4`}>
                        My journey in technology is driven by a passion for artificial intelligence and web development.
                        I'm building intelligent systems and applications that create real-world impact.
                      </p>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} leading-relaxed`}>
                        As Technical Head at ISTE SAL Chapter, I lead workshops, hackathons, and innovative project
                        development, helping fellow students explore the world of technology.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card
                    className={`backdrop-blur-sm hover:shadow-lg transition-all duration-200 animate-slideUp delay-75 hover-lift ${
                      isDarkMode
                        ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                        : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                    }`}
                  >
                    <CardContent className="p-6">
                      <h3
                        className={`text-xl font-semibold mb-4 font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                      >
                        Technical Stack
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2 text-purple-300 font-mono">Languages</h4>
                          <div className="flex flex-wrap gap-1">
                            {["Python", "C++", "Java", "JavaScript", "Node.js"].map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className={`text-xs border transition-colors duration-200 font-mono ${
                                  isDarkMode
                                    ? "bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30"
                                    : "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200"
                                }`}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-indigo-300 font-mono">AI/ML Tools</h4>
                          <div className="flex flex-wrap gap-1">
                            {["TensorFlow", "Scikit-learn", "NumPy", "Pandas"].map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className={`text-xs border transition-colors duration-200 font-mono ${
                                  isDarkMode
                                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/30"
                                    : "bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200"
                                }`}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-violet-300 font-mono">Web Technologies</h4>
                          <div className="flex flex-wrap gap-1">
                            {["React", "Flutter", "Firebase", "MongoDB"].map((skill) => (
                              <Badge
                                key={skill}
                                variant="secondary"
                                className={`text-xs border transition-colors duration-200 font-mono ${
                                  isDarkMode
                                    ? "bg-violet-500/20 text-violet-300 border-violet-500/40 hover:bg-violet-500/30"
                                    : "bg-violet-100 text-violet-700 border-violet-300 hover:bg-violet-200"
                                }`}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )

      case "Academics":
        return (
          <div className="flex-1 p-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <h1
                className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8 animate-slideUp font-mono ${
                  isDarkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-indigo-600"
                }`}
              >
                Academic Background
              </h1>
              {academics.map((academic, index) => (
                <Card
                  key={index}
                  className={`mb-6 backdrop-blur-sm hover:shadow-lg transition-all duration-200 animate-slideUp hover-lift ${
                    isDarkMode
                      ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                      : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2
                          className={`text-2xl font-semibold font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                        >
                          {academic.degree}
                        </h2>
                        <h3 className="text-xl bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-mono">
                          {academic.field}
                        </h3>
                        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mt-1`}>
                          {academic.institution}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} font-medium font-mono`}>
                          {academic.duration}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-semibold mb-2 font-mono ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                        Relevant Coursework:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {academic.coursework.map((course, courseIndex) => (
                          <Badge
                            key={courseIndex}
                            variant="outline"
                            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-colors duration-200 font-mono"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "Achievements":
        return (
          <div className="flex-1 p-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <h1
                className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8 animate-slideUp font-mono ${
                  isDarkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-indigo-600"
                }`}
              >
                Achievements
              </h1>
              <div className="grid grid-cols-1 gap-6">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className={`backdrop-blur-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-2 animate-slideUp hover-lift ${
                      isDarkMode
                        ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                        : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Award className="w-6 h-6 text-yellow-400 mt-1" />
                        <div>
                          <h3
                            className={`text-xl font-semibold mb-1 font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                          >
                            {achievement.title}
                          </h3>
                          <p className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-medium font-mono">
                            {achievement.organization}
                          </p>
                          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm mb-2 font-mono`}>
                            {achievement.date}
                          </p>
                          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "Extra-Curriculars":
        return (
          <div className="flex-1 p-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <h1
                className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8 animate-slideUp font-mono ${
                  isDarkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-indigo-600"
                }`}
              >
                Extra-Curricular Activities
              </h1>
              <div className="space-y-6">
                {extraCurriculars.map((activity, index) => (
                  <Card
                    key={index}
                    className={`backdrop-blur-sm hover:shadow-lg transition-all duration-200 animate-slideUp hover-lift ${
                      isDarkMode
                        ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                        : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3
                            className={`text-xl font-semibold font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                          >
                            {activity.activity}
                          </h3>
                          <p className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent font-medium font-mono">
                            {activity.organization}
                          </p>
                        </div>
                        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} text-sm font-mono`}>
                          {activity.duration}
                        </p>
                      </div>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{activity.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "Contact":
        return (
          <div className="flex-1 p-8 animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <h1
                className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8 animate-slideUp font-mono ${
                  isDarkMode ? "from-purple-400 to-indigo-400" : "from-purple-600 to-indigo-600"
                }`}
              >
                Get In Touch
              </h1>
              <p
                className={`text-center ${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-8 text-lg animate-slideUp delay-75`}
              >
                Interested in building something powerful with AI or web technology? Let's collaborate!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card
                  className={`backdrop-blur-sm hover:shadow-lg transition-all duration-200 animate-slideUp delay-150 hover-lift ${
                    isDarkMode
                      ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                      : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                  }`}
                >
                  <CardContent className="p-6">
                    <h2
                      className={`text-2xl font-semibold mb-6 font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                    >
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 hover:text-purple-400 transition-colors duration-200">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} font-mono`}>
                          vivekvishwakarma.dev@gmail.com
                        </span>
                      </div>
                      <div className="flex items-center gap-3 hover:text-purple-400 transition-colors duration-200">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} font-mono`}>
                          Based in Ahmedabad, India
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Linkedin className="w-5 h-5 text-purple-400" />
                        <Link
                          href="https://www.linkedin.com/in/vivek-vishwakarma-dev"
                          className="text-purple-400 hover:text-purple-300 hover:underline transition-all duration-200 font-mono"
                        >
                          linkedin.com/in/vivek-vishwakarma
                        </Link>
                      </div>
                      <div className="flex items-center gap-3">
                        <Github className="w-5 h-5 text-purple-400" />
                        <Link
                          href="https://github.com/Knights24"
                          className="text-purple-400 hover:text-purple-300 hover:underline transition-all duration-200 font-mono"
                        >
                          github.com/Knights24
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`backdrop-blur-sm hover:shadow-lg transition-all duration-200 animate-slideUp delay-225 hover-lift ${
                    isDarkMode
                      ? "bg-gray-900/60 border-purple-500/30 hover:shadow-purple-500/20"
                      : "bg-white/80 border-purple-200 hover:shadow-purple-500/10 shadow-sm"
                  }`}
                >
                  <CardContent className="p-6">
                    <h2
                      className={`text-2xl font-semibold mb-6 font-mono ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}
                    >
                      Send a Message
                    </h2>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <Input
                          placeholder="Your Name"
                          required
                          className={`border focus:ring-2 focus:ring-purple-500 transition-all duration-200 font-mono ${
                            isDarkMode
                              ? "bg-gray-800/50 border-purple-500/40 text-gray-100 placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-purple-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          required
                          className={`border focus:ring-2 focus:ring-purple-500 transition-all duration-200 font-mono ${
                            isDarkMode
                              ? "bg-gray-800/50 border-purple-500/40 text-gray-100 placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-purple-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Subject"
                          required
                          className={`border focus:ring-2 focus:ring-purple-500 transition-all duration-200 font-mono ${
                            isDarkMode
                              ? "bg-gray-800/50 border-purple-500/40 text-gray-100 placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-purple-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Textarea
                          placeholder="Your Message"
                          rows={5}
                          required
                          className={`border focus:ring-2 focus:ring-purple-500 transition-all duration-200 font-mono ${
                            isDarkMode
                              ? "bg-gray-800/50 border-purple-500/40 text-gray-100 placeholder-gray-400 focus:border-purple-400"
                              : "bg-white border-purple-300 text-gray-900 placeholder-gray-500 focus:border-purple-500"
                          }`}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 font-mono"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      className={`min-h-screen flex relative overflow-hidden transition-all duration-300 gpu-accelerated ${
        isDarkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Enhanced Galaxy Background - Always visible in dark mode */}
      {isDarkMode && (
        <>
          {/* Starfield */}
          <div className="starfield">
            <div className="star star-1"></div>
            <div className="star star-2"></div>
            <div className="star star-3"></div>
            <div className="star star-4"></div>
            <div className="star star-5"></div>
            <div className="star star-6"></div>
            <div className="star star-7"></div>
            <div className="star star-8"></div>
            <div className="star star-9"></div>
            <div className="star star-10"></div>
            <div className="star star-11"></div>
            <div className="star star-12"></div>
            <div className="star star-13"></div>
            <div className="star star-14"></div>
            <div className="star star-15"></div>
          </div>

          {/* Enhanced Nebula Background */}
          <div className="nebula-bg">
            <div className="nebula-layer nebula-1"></div>
            <div className="nebula-layer nebula-2"></div>
            <div className="nebula-layer nebula-3"></div>
            <div className="nebula-layer nebula-4"></div>
            <div className="nebula-layer nebula-5"></div>
            <div className="nebula-layer nebula-6"></div>
            <div className="nebula-layer nebula-7"></div>
            <div className="nebula-layer nebula-8"></div>
          </div>
        </>
      )}

      {/* Cosmic Overlay - Only in Galaxy Mode */}
      {isDarkMode && <div className="cosmic-overlay"></div>}

      {/* Sidebar */}
      <div
        className={`w-64 border-r flex flex-col transition-all duration-300 relative z-10 ${
          isDarkMode
            ? "bg-black/40 border-purple-500/30 backdrop-blur-md"
            : "bg-white/80 border-purple-200 backdrop-blur-sm shadow-lg"
        }`}
      >
        {/* Logo/Name */}
        <div className="p-6 flex-shrink-0">
          <h1
            className={`text-2xl font-bold bg-gradient-to-r cursor-pointer transition-all duration-200 font-mono ${
              isDarkMode
                ? "from-purple-400 to-indigo-400 hover:from-purple-300 hover:to-indigo-300"
                : "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
            } bg-clip-text text-transparent`}
            onClick={() => setCurrentPage("Home")}
          >
            Vivek
            <br />
            Vishwakarma
          </h1>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 px-4 overflow-y-auto">
          <ul className="space-y-1 py-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <li key={index}>
                  <button
                    onClick={() => setCurrentPage(item.name)}
                    className={`w-full flex items-center px-4 py-3 text-sm rounded-md transition-all duration-200 text-left transform hover:scale-105 font-mono ${
                      currentPage === item.name
                        ? isDarkMode
                          ? "bg-purple-500/20 text-purple-300 border-l-2 border-purple-400 shadow-sm shadow-purple-500/20"
                          : "bg-purple-100 text-purple-700 border-l-2 border-purple-500 shadow-sm"
                        : isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-purple-500/10"
                          : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    <span className="mr-3 text-gray-400">—</span>
                    <span className="truncate">{item.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Dark Mode Toggle */}
        <div
          className={`p-4 border-t transition-colors duration-300 flex-shrink-0 ${
            isDarkMode ? "border-purple-500/30" : "border-purple-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-sm transition-colors duration-300 font-mono ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Galaxy Mode
            </span>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Header with Time */}
        <div className="flex justify-end p-6 flex-shrink-0">
          <div
            className={`text-right text-sm animate-fadeIn transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <div
              className={`font-mono text-lg transition-colors duration-300 ${
                isDarkMode ? "text-purple-300" : "text-purple-600"
              }`}
            >
              {currentTime}
            </div>
            <div
              className={`text-xs transition-colors duration-300 font-mono ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {currentDate}
            </div>
          </div>
        </div>

        {/* Page Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">{renderContent()}</div>
      </div>
    </div>
  )
}
