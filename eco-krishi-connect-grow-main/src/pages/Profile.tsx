
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to sign in if not signed in
  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in');
    }
  }, [isSignedIn, navigate]);

  if (!user) return null;

  const initials = user.fullName.split(' ').map(n => n[0]).join('') || '?';

  return (
    <MainLayout>
      <div className="eco-container py-12">
        <h1 className="text-3xl font-bold mb-8 text-eco-dark">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarFallback className="bg-eco-primary text-white text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.fullName}</CardTitle>
                <p className="text-muted-foreground">{user.email}</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <button 
                    className="text-sm text-eco-primary hover:underline" 
                    onClick={() => navigate('/settings')}
                  >
                    Edit Profile Settings
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                    <p>{user.fullName}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Account ID</h3>
                    <p className="text-sm text-muted-foreground">{user.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
