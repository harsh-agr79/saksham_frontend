import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const EditCommunityDialog = ({ community, onSave, onClose }) => {
  const { token, userType } = useSelector((state) => state.auth); // Access token and user type
  const [formData, setFormData] = useState({
    name: community.name,
    description: community.description,
    domainId: community.domain_id || "",
    subdomains: community.subdomains || [],
    coverImage: null,
    avatarImage: null,
  });
  const [domains, setDomains] = useState([]);
  const [subdomains, setSubdomains] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

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
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, [token]);

  // Fetch subdomains when a domain is selected
  useEffect(() => {
    if (formData.domainId) {
      const fetchSubdomains = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/subdomains/${formData.domainId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              },
            }
          );

          if (!response.ok) throw new Error("Failed to fetch subdomains");

          const data = await response.json();
          setSubdomains(data || []);
        } catch (error) {
          console.error("Error fetching subdomains:", error);
        }
      };

      fetchSubdomains();
    }
  }, [formData.domainId, token]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prev) => ({ ...prev, [id]: files[0] }));
  };

  const handleDomainChange = (e) => {
    const domainId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      domainId,
      subdomains: [], // Clear subdomains when domain changes
    }));
  };

  const handleSubdomainToggle = (subdomainId) => {
    setFormData((prev) => ({
      ...prev,
      subdomains: prev.subdomains.includes(subdomainId)
        ? prev.subdomains.filter((id) => id !== subdomainId)
        : [...prev.subdomains, subdomainId],
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    const requestData = new FormData();
    requestData.append("_method", "PUT");
    requestData.append("name", formData.name);
    requestData.append("description", formData.description);
    requestData.append("domain_id", formData.domainId);
    formData.subdomains.forEach((id) => requestData.append("subdomains[]", id));
    if (formData.coverImage) requestData.append("cover_photo", formData.coverImage);
    if (formData.avatarImage) requestData.append("profile_photo", formData.avatarImage);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/update/${community.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: requestData,
        }
      );

      if (!response.ok) throw new Error("Failed to update community");

      const updatedCommunity = await response.json();
      onSave(updatedCommunity); // Notify parent component of the update
      onClose(); // Close the dialog
    } catch (err) {
      console.error("Error updating community:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <h2 className="text-lg font-bold mb-4">Edit Community</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Community Name
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
              Domain
            </label>
            <select
              id="domain"
              value={formData.domainId}
              onChange={handleDomainChange}
              className="w-full border rounded-md p-2"
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
            <label className="block text-sm font-medium text-gray-700">
              Subdomains
            </label>
            <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
              {subdomains.map((subdomain) => (
                <label
                  key={subdomain.id}
                  className="flex items-center space-x-3 py-1"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5"
                    checked={formData.subdomains.includes(subdomain.id)}
                    onChange={() => handleSubdomainToggle(subdomain.id)}
                  />
                  <span>{subdomain.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              Cover Image
            </label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label htmlFor="avatarImage" className="block text-sm font-medium text-gray-700">
              Avatar Image
            </label>
            <input
              id="avatarImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" onClick={onClose} className="mr-2" disabled={isSaving}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCommunityDialog;
