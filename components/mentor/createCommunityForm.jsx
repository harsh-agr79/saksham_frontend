"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";

const CreateCommunityDialog = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    coverImage: null,
    avatarImage: null,
    domainId: "",
    subdomains: [],
  });
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { token, userType } = useSelector((state) => state.auth);

  // Fetch domains on mount
  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/domains`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch domains");

        const data = await response.json();
        setDomains(data || []); // Set domains from API
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Unable to fetch domains. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchDomains();
  }, [token, toast]);

  // Fetch subdomains when a domain is selected
  const fetchSubdomains = async (domainId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subdomains/${domainId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch subdomains");

      const data = await response.json();
      console.log(data)
      setSubdomains(data || []);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Unable to fetch subdomains. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDomainChange = (domainId) => {
    setFormData((prev) => ({ ...prev, domainId, subdomains: [] }));
    fetchSubdomains(domainId);
  };

  const handleSubdomainToggle = (subdomainId) => {
    setFormData((prev) => ({
      ...prev,
      subdomains: prev.subdomains.includes(subdomainId)
        ? prev.subdomains.filter((id) => id !== subdomainId)
        : [...prev.subdomains, subdomainId],
    }));
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [key]: file }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.description || !formData.domainId) {
      toast({
        title: "Validation Error",
        description: "Community Name, Description, and Domain are required.",
        variant: "destructive",
      });
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const requestData = new FormData();
      requestData.append("name", formData.name);
      requestData.append("description", formData.description);
      requestData.append("domain_id", formData.domainId);
  
      // Append each subdomain ID
      formData.subdomains.forEach((id) => requestData.append("subdomains[]", Number(id)));
  
      // Append images if provided
      if (formData.coverImage) {
        requestData.append("cover_photo", formData.coverImage);
      }
      if (formData.avatarImage) {
        requestData.append("profile_photo", formData.avatarImage);
      }
  
      // Debugging: Log FormData entries
      console.log("FormData Entries:");
      for (let pair of requestData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: requestData,
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to create community.");
      }
  
      const newCommunity = await response.json();
  
      toast({
        title: "Community Created",
        description: "Your community was successfully created.",
      });
  
      setOpen(false);
      onSave(newCommunity);
  
      // Reset form data
      setFormData({
        name: "",
        description: "",
        coverImage: null,
        avatarImage: null,
        domainId: "",
        subdomains: [],
      });
    } catch (err) {
      console.error("Error creating community:", err);
      toast({
        title: "Error",
        description: "Failed to create community. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="bg-purple-100">
      <Button onClick={() => setOpen(true)}>Create Community</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Create New Community</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Community Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter community name"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter a brief description"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="domain">Domain</Label>
              <select
                id="domain"
                value={formData.domainId}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select Domain
                </option>
                {domains.map((domain) => (
                  <option key={domain.id} value={domain.id}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Subdomains</Label>
              <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                {subdomains.map((subdomain) => (
                  <label
                    key={subdomain.id}
                    className="flex items-center space-x-3 py-1"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                      checked={formData.subdomains.includes(subdomain.id)}
                      onChange={() => handleSubdomainToggle(subdomain.id)}
                    />
                    <span className="text-gray-700">{subdomain.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="coverImage">Cover Image</Label>
              <Input
                id="coverImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "coverImage")}
              />
            </div>
            <div>
              <Label htmlFor="avatarImage">Avatar Image</Label>
              <Input
                id="avatarImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "avatarImage")}
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCommunityDialog;
