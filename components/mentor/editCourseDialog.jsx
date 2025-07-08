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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

export const EditCourseDialog = ({ course }) => {
  const { userType, token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description || "");
  const [level, setLevel] = useState(course.level);
  const [domain, setDomain] = useState(course.domain_id);
  const [selectedSubdomains, setSelectedSubdomains] = useState(
    course.subdomains.map((subdomain) => subdomain.id) || []
  );

  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    if (open) {
      fetchDomains().then(setDomains).catch(console.error);
    }
  }, [open]);

  useEffect(() => {
    if (domain) {
      fetchSubdomains(domain)
        .then((data) => {
          setSubdomains(data);
          const filteredSubdomains = course.subdomains
            .map((subdomain) => subdomain.id)
            .filter((id) => data.some((subdomain) => subdomain.id === id));
          setSelectedSubdomains(filteredSubdomains);
        })
        .catch(console.error);
    }
  }, [domain, course.subdomains]);

  const fetchDomains = async () => {
    const response = await fetch(`${backendUrl}/domains`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch domains");
    return response.json();
  };

  const fetchSubdomains = async (domainId) => {
    const response = await fetch(`${backendUrl}/subdomains/${domainId}`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch subdomains");
    return response.json();
  };

  const toggleSubdomainSelection = (subdomainId) => {
    setSelectedSubdomains((prev) =>
      prev.includes(subdomainId)
        ? prev.filter((id) => id !== subdomainId)
        : [...prev, subdomainId]
    );
  };

  const handleSave = async () => {
    if (!title || !level || !domain || selectedSubdomains.length === 0) {
      setMessage("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${backendUrl}/${userType}/course/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          level,
          domain_id: domain,
          subdomains: selectedSubdomains,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update course");
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      setMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Edit Course</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
            />
            <Label htmlFor="level">Level</Label>
            <Select onValueChange={setLevel} value={level}>
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="domain">Domain</Label>
            <Select
              onValueChange={(value) => {
                setDomain(Number(value));
                setSelectedSubdomains([]);
              }}
              value={domain?.toString()}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select domain" />
              </SelectTrigger>
              <SelectContent>
                {domains.map((domain) => (
                  <SelectItem key={domain.id} value={domain.id.toString()}>
                    {domain.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label htmlFor="subdomains">Subdomains</Label>
            <div className="flex flex-wrap gap-2">
              {subdomains.map((subdomain) => (
                <div key={subdomain.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`subdomain-${subdomain.id}`}
                    checked={selectedSubdomains.includes(subdomain.id)}
                    onChange={() => toggleSubdomainSelection(subdomain.id)}
                  />
                  <label htmlFor={`subdomain-${subdomain.id}`} className="text-sm">
                    {subdomain.name}
                  </label>
                </div>
              ))}
            </div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
          {message && <p className="text-red-600 mt-2">{message}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
};
