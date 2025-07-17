import React, { useState, useEffect } from 'react';
import { Plus, CheckSquare, Clock, Zap, Star, Users, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { blink } from '../../blink/client';

interface Task {
  id: string;
  title: string;
  description: string;
  jobType: 'creative' | 'technical' | 'business' | 'social';
  difficulty: 'easy' | 'medium' | 'hard' | 'epic';
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  xpReward: number;
  coinReward: number;
  dueDate?: string;
  partyTask: boolean;
  subtasks: SubTask[];
  createdAt: string;
}

interface SubTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  xpReward: number;
  orderIndex: number;
}

const JOB_TYPES = [
  { value: 'creative', label: 'Creative', color: 'job-creative', icon: '🎨' },
  { value: 'technical', label: 'Technical', color: 'job-technical', icon: '💻' },
  { value: 'business', label: 'Business', color: 'job-business', icon: '📊' },
  { value: 'social', label: 'Social', color: 'job-social', icon: '👥' }
];

const DIFFICULTY_LEVELS = [
  { value: 'easy', label: 'Easy', xp: 10, coins: 5, color: 'text-green-400' },
  { value: 'medium', label: 'Medium', xp: 25, coins: 12, color: 'text-yellow-400' },
  { value: 'hard', label: 'Hard', xp: 50, coins: 25, color: 'text-orange-400' },
  { value: 'epic', label: 'Epic', xp: 100, coins: 50, color: 'text-purple-400' }
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'text-slate-400' },
  { value: 'medium', label: 'Medium', color: 'text-blue-400' },
  { value: 'high', label: 'High', color: 'text-orange-400' },
  { value: 'urgent', label: 'Urgent', color: 'text-red-400' }
];

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    jobType: 'creative' as const,
    difficulty: 'medium' as const,
    priority: 'medium' as const,
    dueDate: '',
    partyTask: false
  });
  const [newSubtasks, setNewSubtasks] = useState<string[]>(['']);
  const [user, setUser] = useState<any>(null);
  const [floatingXp, setFloatingXp] = useState<{id: string, amount: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadTasks();
      }
    });
    return unsubscribe;
  }, []);

  const loadTasks = async () => {
    // Mock data - replace with actual API calls
    const mockTasks: Task[] = [
      {
        id: 'task_1',
        title: 'Design Landing Page',
        description: 'Create a modern, responsive landing page for the new product launch',
        jobType: 'creative',
        difficulty: 'medium',
        status: 'in_progress',
        priority: 'high',
        xpReward: 25,
        coinReward: 12,
        dueDate: '2024-07-20',
        partyTask: false,
        createdAt: '2024-07-15',
        subtasks: [
          {
            id: 'subtask_1',
            title: 'Create wireframes',
            description: 'Design basic layout structure',
            status: 'completed',
            xpReward: 5,
            orderIndex: 0
          },
          {
            id: 'subtask_2',
            title: 'Design hero section',
            description: 'Create compelling hero section with CTA',
            status: 'in_progress',
            xpReward: 8,
            orderIndex: 1
          },
          {
            id: 'subtask_3',
            title: 'Add responsive breakpoints',
            description: 'Ensure mobile and tablet compatibility',
            status: 'todo',
            xpReward: 7,
            orderIndex: 2
          }
        ]
      }
    ];

    setTasks(mockTasks);
  };

  const createTask = async () => {
    if (!newTask.title.trim()) return;

    const difficulty = DIFFICULTY_LEVELS.find(d => d.value === newTask.difficulty)!;
    const subtasks: SubTask[] = newSubtasks
      .filter(title => title.trim())
      .map((title, index) => ({
        id: `subtask_${Date.now()}_${index}`,
        title: title.trim(),
        description: '',
        status: 'todo' as const,
        xpReward: Math.ceil(difficulty.xp / newSubtasks.length),
        orderIndex: index
      }));

    const task: Task = {
      id: `task_${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      jobType: newTask.jobType,
      difficulty: newTask.difficulty,
      status: 'todo',
      priority: newTask.priority,
      xpReward: difficulty.xp,
      coinReward: difficulty.coins,
      dueDate: newTask.dueDate || undefined,
      partyTask: newTask.partyTask,
      subtasks,
      createdAt: new Date().toISOString()
    };

    setTasks([task, ...tasks]);
    setIsCreateDialogOpen(false);
    setNewTask({
      title: '',
      description: '',
      jobType: 'creative',
      difficulty: 'medium',
      priority: 'medium',
      dueDate: '',
      partyTask: false
    });
    setNewSubtasks(['']);
  };

  const toggleSubtask = async (taskId: string, subtaskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedSubtasks = task.subtasks.map(subtask => {
          if (subtask.id === subtaskId) {
            const newStatus = subtask.status === 'completed' ? 'todo' : 'completed';
            
            // Show floating XP animation
            if (newStatus === 'completed') {
              showFloatingXp(subtask.xpReward);
            }
            
            return { ...subtask, status: newStatus };
          }
          return subtask;
        });

        // Check if all subtasks are completed
        const allCompleted = updatedSubtasks.every(st => st.status === 'completed');
        const newTaskStatus = allCompleted ? 'completed' : 
                            updatedSubtasks.some(st => st.status === 'in_progress') ? 'in_progress' : 'todo';

        // Show task completion XP
        if (newTaskStatus === 'completed' && task.status !== 'completed') {
          showFloatingXp(task.xpReward);
        }

        return {
          ...task,
          status: newTaskStatus,
          subtasks: updatedSubtasks
        };
      }
      return task;
    }));
  };

  const showFloatingXp = (amount: number) => {
    const id = `xp_${Date.now()}`;
    const newXp = {
      id,
      amount,
      x: Math.random() * 200 + 100,
      y: Math.random() * 100 + 100
    };
    
    setFloatingXp(prev => [...prev, newXp]);
    
    setTimeout(() => {
      setFloatingXp(prev => prev.filter(xp => xp.id !== id));
    }, 2000);
  };

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const addSubtaskField = () => {
    setNewSubtasks([...newSubtasks, '']);
  };

  const updateSubtaskField = (index: number, value: string) => {
    const updated = [...newSubtasks];
    updated[index] = value;
    setNewSubtasks(updated);
  };

  const removeSubtaskField = (index: number) => {
    setNewSubtasks(newSubtasks.filter((_, i) => i !== index));
  };

  const getJobTypeInfo = (jobType: string) => {
    return JOB_TYPES.find(jt => jt.value === jobType) || JOB_TYPES[0];
  };

  const getDifficultyInfo = (difficulty: string) => {
    return DIFFICULTY_LEVELS.find(d => d.value === difficulty) || DIFFICULTY_LEVELS[1];
  };

  const getPriorityInfo = (priority: string) => {
    return PRIORITY_LEVELS.find(p => p.value === priority) || PRIORITY_LEVELS[1];
  };

  const getTaskProgress = (task: Task) => {
    if (task.subtasks.length === 0) return task.status === 'completed' ? 100 : 0;
    const completed = task.subtasks.filter(st => st.status === 'completed').length;
    return Math.round((completed / task.subtasks.length) * 100);
  };

  if (!user) {
    return <div className="pixel-card p-6 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6 relative">
      {/* Floating XP Animations */}
      {floatingXp.map((xp) => (
        <div
          key={xp.id}
          className="floating-xp"
          style={{ left: xp.x, top: xp.y }}
        >
          +{xp.amount} XP
        </div>
      ))}

      {/* Header */}
      <div className="pixel-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl text-white mb-2">Quest Log</h1>
            <p className="text-slate-400">
              Complete tasks to gain XP and level up your character
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="pixel-button">
                <Plus className="w-4 h-4 mr-2" />
                New Quest
              </Button>
            </DialogTrigger>
            <DialogContent className="pixel-card border-slate-600 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading text-white">Create New Quest</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Quest Title
                    </label>
                    <Input
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Enter quest title..."
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Job Type
                    </label>
                    <Select value={newTask.jobType} onValueChange={(value: any) => setNewTask({...newTask, jobType: value})}>
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Describe the quest..."
                    className="bg-slate-700 border-slate-600"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Difficulty
                    </label>
                    <Select value={newTask.difficulty} onValueChange={(value: any) => setNewTask({...newTask, difficulty: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="pixel-card border-slate-600">
                        {DIFFICULTY_LEVELS.map((diff) => (
                          <SelectItem key={diff.value} value={diff.value}>
                            <div className="flex items-center justify-between w-full">
                              <span className={diff.color}>{diff.label}</span>
                              <span className="text-xs text-slate-400 ml-2">{diff.xp} XP</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Priority
                    </label>
                    <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({...newTask, priority: value})}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="pixel-card border-slate-600">
                        {PRIORITY_LEVELS.map((priority) => (
                          <SelectItem key={priority.value} value={priority.value}>
                            <span className={priority.color}>{priority.label}</span>
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
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      className="bg-slate-700 border-slate-600"
                    />
                  </div>
                </div>

                {/* Subtasks */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Sub-Quests (Optional)
                  </label>
                  <div className="space-y-2">
                    {newSubtasks.map((subtask, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={subtask}
                          onChange={(e) => updateSubtaskField(index, e.target.value)}
                          placeholder={`Sub-quest ${index + 1}...`}
                          className="bg-slate-700 border-slate-600"
                        />
                        {newSubtasks.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSubtaskField(index)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSubtaskField}
                      className="border-slate-600 text-slate-400"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Sub-Quest
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="partyTask"
                    checked={newTask.partyTask}
                    onCheckedChange={(checked) => setNewTask({...newTask, partyTask: !!checked})}
                  />
                  <label htmlFor="partyTask" className="text-sm text-slate-300">
                    Party Quest (share with party members)
                  </label>
                </div>

                <Button onClick={createTask} className="w-full pixel-button">
                  Create Quest
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const jobType = getJobTypeInfo(task.jobType);
          const difficulty = getDifficultyInfo(task.difficulty);
          const priority = getPriorityInfo(task.priority);
          const progress = getTaskProgress(task);
          const isExpanded = expandedTasks.has(task.id);

          return (
            <div key={task.id} className="pixel-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <button
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </button>
                    <h3 className="font-heading text-lg text-white">{task.title}</h3>
                    {task.partyTask && (
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        <Users className="w-3 h-3 mr-1" />
                        Party
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-slate-400 text-sm mb-3 ml-8">{task.description}</p>
                  
                  <div className="flex items-center space-x-4 ml-8">
                    <Badge className={`job-badge ${jobType.color}`}>
                      {jobType.icon} {jobType.label}
                    </Badge>
                    <Badge className={`px-2 py-1 text-xs ${difficulty.color} bg-slate-700/50 border-slate-600`}>
                      {difficulty.label}
                    </Badge>
                    <Badge className={`px-2 py-1 text-xs ${priority.color} bg-slate-700/50 border-slate-600`}>
                      {priority.label}
                    </Badge>
                    {task.dueDate && (
                      <div className="flex items-center space-x-1 text-slate-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">{task.xpReward} XP</span>
                  </div>
                  <div className="text-slate-400 text-sm">{progress}% Complete</div>
                  <div className="w-24 bg-slate-700 h-2 rounded-full mt-1">
                    <div 
                      className="xp-bar h-full rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Subtasks */}
              {isExpanded && task.subtasks.length > 0 && (
                <div className="ml-8 space-y-2 border-t border-slate-700 pt-4">
                  <h4 className="font-medium text-slate-300 text-sm mb-3">Sub-Quests:</h4>
                  {task.subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className={`subtask-item ${subtask.status === 'completed' ? 'subtask-completed' : ''}`}
                    >
                      <Checkbox
                        checked={subtask.status === 'completed'}
                        onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                        className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                      />
                      <div className="flex-1">
                        <span className={`text-sm ${subtask.status === 'completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                          {subtask.title}
                        </span>
                        {subtask.description && (
                          <p className="text-xs text-slate-400 mt-1">{subtask.description}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-yellow-400">
                        <Zap className="w-3 h-3" />
                        <span>{subtask.xpReward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {tasks.length === 0 && (
        <div className="pixel-card p-12 text-center">
          <CheckSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="font-heading text-xl text-white mb-2">No Quests Yet</h3>
          <p className="text-slate-400 mb-6">
            Create your first quest to start earning XP and leveling up!
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="pixel-button">
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Quest
          </Button>
        </div>
      )}
    </div>
  );
}