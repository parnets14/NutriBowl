import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit3, Trash2, Save, X, Eye, Users, FileText, Target } from 'lucide-react';

import { Textarea } from '../Components/ui/textarea';
import { Input } from '../Components/ui/input';
import { Button } from '../Components/ui/button';
import { Label } from '../Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';

const API_URL = "http://localhost:5001/api/about";

const AboutUsAdmin = () => {
  const [aboutData, setAboutData] = useState({
    title: "Your Nutrition Journey Starts Here",
    paragraphs: ["At NutriBowl, we believe healthy eating should be simple, satisfying, and sustainable."],
    bulletPoints: ["Macro-balanced meals designed by certified dietitians"],
    teamMembers: [{ name: "Sarah Chen", role: "Co-Founder", image: "" }],
    buttonText: "Explore Meal Plans"
  });
  
  const [editing, setEditing] = useState({ type: null, index: null });
  const [tempData, setTempData] = useState('');
  const [tempMember, setTempMember] = useState({ name: '', role: '', image: '' });
  const [showPreview, setShowPreview] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const notify = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(API_URL);
      if (data && data.data) {
        setAboutData({
          ...data.data,
          paragraphs: data.data.paragraphs || [],
          bulletPoints: data.data.bulletPoints || [],
          teamMembers: data.data.teamMembers || []
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      notify("Failed to fetch data", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (type, index = null) => {
    setEditing({ type, index });
    if (type === 'teamMember') {
      const teamMembers = aboutData.teamMembers || [];
      setTempMember(index !== null ? { ...teamMembers[index] } : { name: '', role: '', image: '' });
    } else {
      const data = type === 'paragraph' ? (aboutData.paragraphs || []) : (aboutData.bulletPoints || []);
      setTempData(index !== null ? data[index] : '');
    }
  };

  const handleDelete = (type, index) => {
    const field = type === 'paragraph' ? 'paragraphs' : type === 'bulletPoint' ? 'bulletPoints' : 'teamMembers';
    const currentArray = aboutData[field] || [];
    const updated = currentArray.filter((_, i) => i !== index);
    setAboutData({ ...aboutData, [field]: updated });
    notify(`${type} deleted successfully`);
  };

  const handleSave = () => {
    const { type, index } = editing;
    
    if (type === 'teamMember') {
      if (!tempMember.name.trim() || !tempMember.role.trim()) return;
      const updated = [...(aboutData.teamMembers || [])];
      if (index !== null) {
        updated[index] = tempMember;
      } else {
        updated.push(tempMember);
      }
      setAboutData({ ...aboutData, teamMembers: updated });
    } else {
      if (!tempData.trim()) return;
      const field = type === 'paragraph' ? 'paragraphs' : 'bulletPoints';
      const updated = [...(aboutData[field] || [])];
      if (index !== null) {
        updated[index] = tempData;
      } else {
        updated.push(tempData);
      }
      setAboutData({ ...aboutData, [field]: updated });
    }
    
    setEditing({ type: null, index: null });
    setTempData('');
    setTempMember({ name: '', role: '', image: '' });
    notify(`${type} ${index !== null ? 'updated' : 'added'} successfully`);
  };

  const handleCancel = () => {
    setEditing({ type: null, index: null });
    setTempData('');
    setTempMember({ name: '', role: '', image: '' });
  };

  const saveAll = async () => {
    try {
      setIsLoading(true);
      if (aboutData._id) {
        await axios.put(`${API_URL}/${aboutData._id}`, aboutData);
      } else {
        await axios.post(API_URL, aboutData);
      }
      notify("All changes saved successfully!");
      fetchData();
    } catch (error) {
      notify("Failed to save changes", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const renderSection = (title, items = [], type, icon) => (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            {icon}
            {title}
            <Badge variant="secondary">{items?.length || 0}</Badge>
          </CardTitle>
          <Button onClick={() => handleEdit(type)} size="sm" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items?.map((item, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                {type === 'teamMember' ? (
                  <div className="flex gap-4">
                    {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />}
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.role}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">{item}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(type, i)} className="h-8 w-8 p-0">
                  <Edit3 className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(type, i)} 
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {editing.type === type && (
          <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
            <div className="space-y-4">
              {type === 'teamMember' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Input value={tempMember.name} onChange={(e) => setTempMember({...tempMember, name: e.target.value})} 
                           placeholder="Name" className="border-green-300" />
                    <Input value={tempMember.role} onChange={(e) => setTempMember({...tempMember, role: e.target.value})} 
                           placeholder="Role" className="border-green-300" />
                  </div>
                  <Input value={tempMember.image} onChange={(e) => setTempMember({...tempMember, image: e.target.value})} 
                         placeholder="Image URL" className="border-green-300" />
                </>
              ) : type === 'paragraph' ? (
                <Textarea value={tempData} onChange={(e) => setTempData(e.target.value)} 
                         placeholder="Enter paragraph" rows={4} className="border-green-300" />
              ) : (
                <Input value={tempData} onChange={(e) => setTempData(e.target.value)} 
                       placeholder="Enter bullet point" className="border-green-300" />
              )}
              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm" className="flex items-center gap-2">
                  <Save className="w-3 h-3" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel} size="sm" className="flex items-center gap-2">
                  <X className="w-3 h-3" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">About Us Content Management</h1>
            <p className="text-gray-600">Manage your about page content with ease</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button onClick={saveAll} disabled={isLoading} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
              {isLoading ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </div>

        {/* Notifications */}
        {notification.show && (
          <Alert className={`mb-6 ${notification.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <AlertDescription className={notification.type === 'error' ? 'text-red-700' : 'text-green-700'}>
              {notification.message}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Content Management */}
          <div className="space-y-6">
            {/* Title */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Target className="w-5 h-5" />
                  Main Title
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input value={aboutData.title} onChange={(e) => setAboutData({ ...aboutData, title: e.target.value })}
                       className="text-lg font-medium border-gray-200 focus:border-green-500" placeholder="Enter main title" />
              </CardContent>
            </Card>

            {/* Sections */}
            {renderSection("Content Paragraphs", aboutData.paragraphs || [], "paragraph", <FileText className="w-5 h-5" />)}
            {renderSection("Key Features", aboutData.bulletPoints || [], "bulletPoint", <Target className="w-5 h-5" />)}
            {renderSection("Team Members", aboutData.teamMembers || [], "teamMember", <Users className="w-5 h-5" />)}

            {/* Button Text */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900">Call-to-Action Button</CardTitle>
              </CardHeader>
              <CardContent>
                <Input value={aboutData.buttonText} onChange={(e) => setAboutData({ ...aboutData, buttonText: e.target.value })}
                       className="border-gray-200 focus:border-green-500" placeholder="Button text" />
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          {showPreview && (
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[80vh] overflow-y-auto">
                <div className="prose max-w-none">
                  <h3 className="text-2xl font-bold text-green-900 mb-6">{aboutData.title}</h3>
                  {(aboutData.paragraphs || []).map((para, i) => (
                    <p key={i} className="text-gray-700 mb-4 leading-relaxed">{para}</p>
                  ))}
                  <ul className="space-y-2 mb-6">
                    {(aboutData.bulletPoints || []).map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {(aboutData.teamMembers || []).map((member, i) => (
                      <div key={i} className="text-center">
                        {member.image && <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-lg shadow-md mb-4" />}
                        <h4 className="font-semibold text-lg text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                      {aboutData.buttonText}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUsAdmin;