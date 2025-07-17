import React, { useState, useEffect } from 'react';
import { Plus, FolderOpen, Calendar, Users, Target, CheckCircle, Clock, Star, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { blink } from '../../blink/client';

interface Project {
  id: string;
  name: string;
  description: string;
  jobType: 'creative' | 'technical' | 'business' | 'social';
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  progress: number;
  xpReward: number;
  coinReward: number;
  dueDate?: string;
  partyProject: boolean;
  milestones: Milestone[];
  tasks: ProjectTask[];
  createdAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  xpReward: number;
  coinReward: number;
  dueDate?: string;
  completedAt?: string;
}

interface ProjectTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'completed';
  assignedTo?: string;
  dueDate?: string;
}

const JOB_TYPES = [
  { value: 'creative', label: 'Creative', color: 'job-creative', icon: '🎨' },
  { value: 'technical', label: 'Technical', color: 'job-technical', icon: '💻' },
  { value: 'business', label: 'Business', color: 'job-business', icon: '📊' },
  { value: 'social', label: 'Social', color: 'job-social', icon: '👥' }
];

const PROJECT_STATUS = [
  { value: 'active', label: 'Active', color: 'text-green-400', bgColor: 'bg-green-500/10' },
  { value: 'paused', label: 'Paused', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
  { value: 'completed', label: 'Completed', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-red-400', bgColor: 'bg-red-500/10' }
];

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isMilestoneDialogOpen, setIsMilestoneDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    jobType: 'creative' as const,
    dueDate: '',
    partyProject: false
  });
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    xpReward: 15,
    coinReward: 10
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadProjects();
      }
    });
    return unsubscribe;
  }, []);

  const loadProjects = async () => {
    // Mock data - replace with actual API calls
    const mockProjects: Project[] = [
      {
        id: 'project_1',
        name: 'E-commerce Platform Redesign',
        description: 'Complete overhaul of the online store interface and user experience',
        jobType: 'creative',
        status: 'active',
        progress: 65,
        xpReward: 200,
        coinReward: 100,
        dueDate: '2024-08-15',
        partyProject: true,
        createdAt: '2024-07-01',
        milestones: [
          {
            id: 'milestone_1',
            title: 'User Research & Analysis',
            description: 'Conduct user interviews and analyze current pain points',
            status: 'completed',
            xpReward: 25,
            coinReward: 15,
            dueDate: '2024-07-10',
            completedAt: '2024-07-09'
          },
          {
            id: 'milestone_2',
            title: 'Wireframes & Prototypes',
            description: 'Create low and high-fidelity prototypes',
            status: 'completed',
            xpReward: 30,
            coinReward: 20,
            dueDate: '2024-07-20',
            completedAt: '2024-07-18'
          },
          {
            id: 'milestone_3',
            title: 'Visual Design System',
            description: 'Develop comprehensive design system and components',
            status: 'pending',
            xpReward: 40,
            coinReward: 25,
            dueDate: '2024-07-30'
          }
        ],
        tasks: [
          {
            id: 'task_1',
            title: 'Create product page mockups',
            status: 'completed',
            assignedTo: 'Alice',
            dueDate: '2024-07-25'
          },
          {
            id: 'task_2',
            title: 'Design checkout flow',
            status: 'in_progress',
            assignedTo: 'Bob',
            dueDate: '2024-07-28'
          }
        ]
      }
    ];

    setProjects(mockProjects);
    if (mockProjects.length > 0) {
      setSelectedProject(mockProjects[0]);
    }
  };

  const createProject = async () => {
    if (!newProject.name.trim()) return;

    const project: Project = {
      id: `project_${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      jobType: newProject.jobType,
      status: 'active',
      progress: 0,
      xpReward: 100,
      coinReward: 50,
      dueDate: newProject.dueDate || undefined,
      partyProject: newProject.partyProject,
      milestones: [],
      tasks: [],
      createdAt: new Date().toISOString()
    };

    setProjects([project, ...projects]);
    setSelectedProject(project);
    setIsCreateDialogOpen(false);
    setNewProject({
      name: '',
      description: '',
      jobType: 'creative',
      dueDate: '',
      partyProject: false
    });
  };

  const addMilestone = async () => {
    if (!selectedProject || !newMilestone.title.trim()) return;

    const milestone: Milestone = {
      id: `milestone_${Date.now()}`,
      title: newMilestone.title,
      description: newMilestone.description,
      status: 'pending',
      xpReward: newMilestone.xpReward,
      coinReward: newMilestone.coinReward,
      dueDate: newMilestone.dueDate || undefined
    };

    const updatedProject = {
      ...selectedProject,
      milestones: [...selectedProject.milestones, milestone]
    };

    setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
    setIsMilestoneDialogOpen(false);
    setNewMilestone({
      title: '',
      description: '',
      dueDate: '',
      xpReward: 15,
      coinReward: 10
    });
  };

  const toggleMilestone = async (milestoneId: string) => {
    if (!selectedProject) return;

    const updatedMilestones = selectedProject.milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        const newStatus = milestone.status === 'completed' ? 'pending' : 'completed';
        return {
          ...milestone,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
        };
      }
      return milestone;
    });

    // Calculate new progress
    const completedMilestones = updatedMilestones.filter(m => m.status === 'completed').length;
    const totalMilestones = updatedMilestones.length;
    const newProgress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

    const updatedProject = {
      ...selectedProject,
      milestones: updatedMilestones,
      progress: newProgress,
      status: newProgress === 100 ? 'completed' as const : selectedProject.status
    };

    setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p));
    setSelectedProject(updatedProject);
  };

  const getJobTypeInfo = (jobType: string) => {
    return JOB_TYPES.find(jt => jt.value === jobType) || JOB_TYPES[0];
  };

  const getStatusInfo = (status: string) => {
    return PROJECT_STATUS.find(s => s.value === status) || PROJECT_STATUS[0];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) {
    return <div className="pixel-card p-6 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pixel-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl text-white mb-2">Project Management</h1>
            <p className="text-slate-400">
              Organize and track your long-term goals and initiatives
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="pixel-button">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="pixel-card border-slate-600 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading text-white">Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Name
                  </label>
                  <Input
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    placeholder="Enter project name..."
                    className="bg-slate-700 border-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Describe the project..."
                    className="bg-slate-700 border-slate-600"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Job Type
                    </label>
                    <Select value={newProject.jobType} onValueChange={(value: any) => setNewProject({...newProject, jobType: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="pixel-card border-slate-600">
                        {JOB_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <span>{type.icon}</span>
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={newProject.dueDate}
                      onChange={(e) => setNewProject({...newProject, dueDate: e.target.value})}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                </div>

                <Button onClick={createProject} className="w-full pixel-button">
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-1">
          <div className="pixel-card p-6">
            <h2 className="font-heading text-lg text-white mb-4">Projects</h2>
            <div className="space-y-3">
              {projects.map((project) => {
                const jobType = getJobTypeInfo(project.jobType);
                const status = getStatusInfo(project.status);
                const isSelected = selectedProject?.id === project.id;

                return (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'bg-purple-500/20 border-purple-500/50' 
                        : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-white text-sm">{project.name}</h3>
                      <Badge className={`text-xs ${status.color} ${status.bgColor} border-slate-600`}>
                        {status.label}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className={`job-badge ${jobType.color} text-xs`}>
                        {jobType.icon} {jobType.label}
                      </Badge>
                      {project.partyProject && (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                          <Users className="w-3 h-3 mr-1" />
                          Party
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    {project.dueDate && (
                      <div className="flex items-center space-x-1 mt-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>Due {formatDate(project.dueDate)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No projects yet</p>
                <p className="text-slate-500 text-xs">Create your first project to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject ? (
            <div className="space-y-6">
              {/* Project Overview */}
              <div className="pixel-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="font-heading text-xl text-white mb-2">{selectedProject.name}</h2>
                    <p className="text-slate-400 text-sm mb-4">{selectedProject.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={`job-badge ${getJobTypeInfo(selectedProject.jobType).color}`}>
                        {getJobTypeInfo(selectedProject.jobType).icon} {getJobTypeInfo(selectedProject.jobType).label}
                      </Badge>
                      <Badge className={`px-2 py-1 text-xs ${getStatusInfo(selectedProject.status).color} ${getStatusInfo(selectedProject.status).bgColor} border-slate-600`}>
                        {getStatusInfo(selectedProject.status).label}
                      </Badge>
                      {selectedProject.partyProject && (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          <Users className="w-3 h-3 mr-1" />
                          Party Project
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-1">{selectedProject.progress}%</div>
                    <div className="text-slate-400 text-sm">Complete</div>
                    {selectedProject.dueDate && (
                      <div className="text-slate-500 text-xs mt-2">
                        {getDaysUntilDue(selectedProject.dueDate)} days left
                      </div>
                    )}
                  </div>
                </div>

                <Progress value={selectedProject.progress} className="h-3 mb-4" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-yellow-400">{selectedProject.xpReward}</div>
                    <div className="text-slate-400 text-xs">XP Reward</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-400">{selectedProject.milestones.length}</div>
                    <div className="text-slate-400 text-xs">Milestones</div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-blue-400">{selectedProject.tasks.length}</div>
                    <div className="text-slate-400 text-xs">Tasks</div>
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="pixel-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg text-white">Milestones</h3>
                  <Dialog open={isMilestoneDialogOpen} onOpenChange={setIsMilestoneDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="pixel-button">
                        <Plus className="w-4 h-4 mr-1" />
                        Add Milestone
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="pixel-card border-slate-600">
                      <DialogHeader>
                        <DialogTitle className="font-heading text-white">Add Milestone</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Milestone Title
                          </label>
                          <Input
                            value={newMilestone.title}
                            onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                            placeholder="Enter milestone title..."
                            className="bg-slate-700 border-slate-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Description
                          </label>
                          <Textarea
                            value={newMilestone.description}
                            onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                            placeholder="Describe the milestone..."
                            className="bg-slate-700 border-slate-600"
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              XP Reward
                            </label>
                            <Input
                              type="number"
                              value={newMilestone.xpReward}
                              onChange={(e) => setNewMilestone({...newMilestone, xpReward: parseInt(e.target.value) || 15})}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Coin Reward
                            </label>
                            <Input
                              type="number"
                              value={newMilestone.coinReward}
                              onChange={(e) => setNewMilestone({...newMilestone, coinReward: parseInt(e.target.value) || 10})}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Due Date
                            </label>
                            <Input
                              type="date"
                              value={newMilestone.dueDate}
                              onChange={(e) => setNewMilestone({...newMilestone, dueDate: e.target.value})}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                        </div>
                        <Button onClick={addMilestone} className="w-full pixel-button">
                          Add Milestone
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-3">
                  {selectedProject.milestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        milestone.status === 'completed'
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-slate-700/30 border-slate-600/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <button
                            onClick={() => toggleMilestone(milestone.id)}
                            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              milestone.status === 'completed'
                                ? 'bg-green-500 border-green-500'
                                : 'border-slate-500 hover:border-green-500'
                            }`}
                          >
                            {milestone.status === 'completed' && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </button>
                          <div className="flex-1">
                            <h4 className={`font-medium ${
                              milestone.status === 'completed' 
                                ? 'text-green-300 line-through' 
                                : 'text-white'
                            }`}>
                              {milestone.title}
                            </h4>
                            <p className="text-slate-400 text-sm mt-1">{milestone.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1 text-xs text-yellow-400">
                                <Zap className="w-3 h-3" />
                                <span>{milestone.xpReward} XP</span>
                              </div>
                              {milestone.dueDate && (
                                <div className="flex items-center space-x-1 text-xs text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  <span>Due {formatDate(milestone.dueDate)}</span>
                                </div>
                              )}
                              {milestone.completedAt && (
                                <div className="flex items-center space-x-1 text-xs text-green-400">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>Completed {formatDate(milestone.completedAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedProject.milestones.length === 0 && (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">No milestones yet</p>
                    <p className="text-slate-500 text-xs">Add milestones to track project progress!</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="pixel-card p-12 text-center">
              <FolderOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="font-heading text-xl text-white mb-2">Select a Project</h3>
              <p className="text-slate-400">
                Choose a project from the list to view details and manage milestones
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}