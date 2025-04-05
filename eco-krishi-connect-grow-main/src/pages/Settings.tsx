
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { user, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect to sign in if not signed in
  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in');
    }
  }, [isSignedIn, navigate]);

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div className="eco-container py-12">
        <h1 className="text-3xl font-bold mb-8 text-eco-dark">Settings</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Update your profile information and how it appears to other users.
                </p>
                
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <input 
                      id="name" 
                      type="text" 
                      defaultValue={user.fullName}
                      className="border rounded-md px-3 py-2 w-full"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input 
                      id="email" 
                      type="email" 
                      defaultValue={user.email}
                      className="border rounded-md px-3 py-2 w-full"
                      readOnly
                    />
                    <p className="text-xs text-muted-foreground">
                      Your email address is used for sign-in and cannot be changed.
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveChanges} className="bg-eco-primary hover:bg-eco-primary/90">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Manage your account settings and preferences.
                </p>
                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges} className="bg-eco-primary hover:bg-eco-primary/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Manage your notification preferences.
                </p>
                <div className="flex justify-end">
                  <Button onClick={handleSaveChanges} className="bg-eco-primary hover:bg-eco-primary/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
