import { useMutation } from "@tanstack/react-query";

export const useConvertFigmaFile = () => {
  return useMutation({
    mutationKey: ["convert-figma-file"],
    mutationFn: async ({ figmaUrl }: { figmaUrl: string }) => {
      const response = await fetch("/api/images/convert-figma", {
        method: "POST",
        body: JSON.stringify({ figmaUrl }),
      });
      return response.json();
    },
  });
};
