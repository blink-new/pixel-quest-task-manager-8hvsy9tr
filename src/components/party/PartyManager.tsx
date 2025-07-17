import React, { useState, useEffect } from 'react';
import { Users, Crown, UserPlus, Search, Star, Trophy, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { blink } from '../../blink/client';

interface Party {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  leaderName: string;
  memberCount: number;
  maxMembers: number;
  xpBonus: number;
  level: number;
  totalXp: number;
}

interface PartyMember {
  id: string;
  userId: string;
  username: string;
  level: number;
  jobType: string;
  role: string;
  xpContributed: number;
  joinedAt: string;
}

export function PartyManager() {
  const [currentParty, setCurrentParty] = useState<Party | null>(null);
  const [partyMembers, setPartyMembers] = useState<PartyMember[]>([]);
  const [availableParties, setAvailableParties] = useState<Party[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPartyName, setNewPartyName] = useState('');
  const [newPartyDescription, setNewPartyDescription] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
      if (state.user) {
        loadUserParty();
        loadAvailableParties();
      }
    });
    return unsubscribe;
  }, []);

  const loadUserParty = async () => {
    // Mock data for now - replace with actual API calls
    const mockParty: Party = {
      id: 'party_1',
      name: 'Code Crusaders',
      description: 'A party of developers conquering bugs and building features',
      leaderId: 'user_1',
      leaderName: 'Alice',
      memberCount: 4,
      maxMembers: 8,
      xpBonus: 1.15,
      level: 12,
      totalXp: 15420
    };

    const mockMembers: PartyMember[] = [
      {
        id: 'member_1',
        userId: 'user_1',
        username: 'Alice',
        level: 25,
        jobType: 'technical',
        role: 'leader',
        xpContributed: 8500,
        joinedAt: '2024-01-15'
      },
      {
        id: 'member_2',
        userId: 'user_2',
        username: 'Bob',
        level: 18,
        jobType: 'creative',
        role: 'officer',
        xpContributed: 4200,
        joinedAt: '2024-01-20'
      },
      {
        id: 'member_3',
        userId: 'user_3',
        username: 'Charlie',
        level: 15,
        jobType: 'business',
        role: 'member',
        xpContributed: 2720,
        joinedAt: '2024-02-01'
      }
    ];

    setCurrentParty(mockParty);
    setPartyMembers(mockMembers);
  };

  const loadAvailableParties = async () => {
    // Mock data for available parties
    const mockParties: Party[] = [
      {
        id: 'party_2',
        name: 'Design Dragons',
        description: 'Creative minds crafting beautiful experiences',
        leaderId: 'user_4',
        leaderName: 'Diana',
        memberCount: 3,
        maxMembers: 6,
        xpBonus: 1.12,
        level: 8,
        totalXp: 9800
      },
      {
        id: 'party_3',
        name: 'Business Builders',
        description: 'Strategic thinkers driving growth and innovation',
        leaderId: 'user_5',
        leaderName: 'Eve',
        memberCount: 5,
        maxMembers: 10,
        xpBonus: 1.18,
        level: 15,
        totalXp: 22100
      }
    ];

    setAvailableParties(mockParties);
  };

  const createParty = async () => {
    if (!newPartyName.trim()) return;

    // Mock party creation
    const newParty: Party = {
      id: `party_${Date.now()}`,
      name: newPartyName,
      description: newPartyDescription,
      leaderId: user?.id || 'current_user',
      leaderName: user?.email?.split('@')[0] || 'You',
      memberCount: 1,
      maxMembers: 8,
      xpBonus: 1.1,
      level: 1,
      totalXp: 0
    };

    setCurrentParty(newParty);
    setPartyMembers([{
      id: 'member_new',
      userId: user?.id || 'current_user',
      username: user?.email?.split('@')[0] || 'You',
      level: 1,
      jobType: 'creative',
      role: 'leader',
      xpContributed: 0,
      joinedAt: new Date().toISOString().split('T')[0]
    }]);

    setIsCreateDialogOpen(false);
    setNewPartyName('');
    setNewPartyDescription('');
  };

  const joinParty = async (partyId: string) => {
    // Mock joining party
    const party = availableParties.find(p => p.id === partyId);
    if (party) {
      setCurrentParty(party);
      // Add current user to members
      const newMember: PartyMember = {
        id: `member_${Date.now()}`,
        userId: user?.id || 'current_user',
        username: user?.email?.split('@')[0] || 'You',
        level: 1,
        jobType: 'creative',
        role: 'member',
        xpContributed: 0,
        joinedAt: new Date().toISOString().split('T')[0]
      };
      setPartyMembers([...partyMembers, newMember]);
    }
  };

  const leaveParty = async () => {
    setCurrentParty(null);
    setPartyMembers([]);
  };

  const getJobTypeColor = (jobType: string) => {
    switch (jobType) {
      case 'creative': return 'job-creative';
      case 'technical': return 'job-technical';
      case 'business': return 'job-business';
      case 'social': return 'job-social';
      default: return 'job-creative';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'leader': return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'officer': return <Star className="w-4 h-4 text-blue-400" />;
      default: return <Users className="w-4 h-4 text-slate-400" />;
    }
  };

  if (!user) {
    return <div className="pixel-card p-6 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Current Party */}
      {currentParty ? (
        <div className="pixel-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-heading text-xl text-white">{currentParty.name}</h2>
                <p className="text-slate-400 text-sm">{currentParty.description}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={leaveParty}
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Leave Party
            </Button>
          </div>

          {/* Party Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{currentParty.level}</div>
              <div className="text-slate-400 text-sm">Party Level</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{currentParty.totalXp.toLocaleString()}</div>
              <div className="text-slate-400 text-sm">Total XP</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{currentParty.memberCount}/{currentParty.maxMembers}</div>
              <div className="text-slate-400 text-sm">Members</div>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">+{Math.round((currentParty.xpBonus - 1) * 100)}%</div>
              <div className="text-slate-400 text-sm">XP Bonus</div>
            </div>
          </div>

          {/* Party Members */}
          <div>
            <h3 className="font-heading text-lg text-white mb-4">Party Members</h3>
            <div className="space-y-3">
              {partyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                      {getRoleIcon(member.role)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-white">{member.username}</span>
                        <Badge className={`job-badge ${getJobTypeColor(member.jobType)}`}>
                          {member.jobType}
                        </Badge>
                      </div>
                      <div className="text-slate-400 text-sm">Level {member.level} • {member.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-medium">{member.xpContributed.toLocaleString()} XP</div>
                    <div className="text-slate-500 text-sm">Contributed</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* No Party - Show Available Parties */
        <div className="space-y-6">
          <div className="pixel-card p-6 text-center">
            <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="font-heading text-xl text-white mb-2">Join a Party</h2>
            <p className="text-slate-400 mb-6">
              Team up with other adventurers to earn bonus XP and tackle challenges together!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="pixel-button">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Party
                  </Button>
                </DialogTrigger>
                <DialogContent className="pixel-card border-slate-600">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-white">Create New Party</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Party Name
                      </label>
                      <Input
                        value={newPartyName}
                        onChange={(e) => setNewPartyName(e.target.value)}
                        placeholder="Enter party name..."
                        className="bg-slate-700 border-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Description
                      </label>
                      <Input
                        value={newPartyDescription}
                        onChange={(e) => setNewPartyDescription(e.target.value)}
                        placeholder="Describe your party..."
                        className="bg-slate-700 border-slate-600"
                      />
                    </div>
                    <Button onClick={createParty} className="w-full pixel-button">
                      Create Party
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search Available Parties */}
          <div className="pixel-card p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search parties..."
                  className="pl-10 bg-slate-700 border-slate-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableParties
                .filter(party => 
                  party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  party.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((party) => (
                  <div key={party.id} className="party-card">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading text-lg text-white mb-1">{party.name}</h3>
                        <p className="text-slate-400 text-sm mb-2">{party.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>Level {party.level}</span>
                          <span>{party.memberCount}/{party.maxMembers} members</span>
                          <span className="text-yellow-400">+{Math.round((party.xpBonus - 1) * 100)}% XP</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-slate-400">
                        <Crown className="w-4 h-4" />
                        <span className="text-sm">{party.leaderName}</span>
                      </div>
                      <Button 
                        onClick={() => joinParty(party.id)}
                        size="sm"
                        className="pixel-button"
                        disabled={party.memberCount >= party.maxMembers}
                      >
                        {party.memberCount >= party.maxMembers ? 'Full' : 'Join'}
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}