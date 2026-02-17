import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertInquiry } from "@shared/routes";

// ==========================================
// SERVICES HOOKS
// ==========================================

export function useServices() {
  return useQuery({
    queryKey: [api.services.list.path],
    queryFn: async () => {
      const res = await fetch(api.services.list.path);
      if (!res.ok) throw new Error("Failed to fetch services");
      return api.services.list.responses[200].parse(await res.json());
    },
  });
}

// ==========================================
// CAROUSEL HOOKS
// ==========================================

export function useCarouselImages() {
  return useQuery({
    queryKey: [api.carousel.list.path],
    queryFn: async () => {
      const res = await fetch(api.carousel.list.path);
      if (!res.ok) throw new Error("Failed to fetch carousel images");
      return api.carousel.list.responses[200].parse(await res.json());
    },
  });
}

// ==========================================
// INQUIRY/CONTACT HOOKS
// ==========================================

export function useCreateInquiry() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const validated = api.inquiries.create.input.parse(data);
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.inquiries.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit inquiry");
      }
      
      return api.inquiries.create.responses[201].parse(await res.json());
    },
    // No specific invalidation needed as we don't display inquiries on frontend publicly
  });
}
