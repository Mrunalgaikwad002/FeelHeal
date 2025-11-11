"use client";

// Fallback route to keep old /humor links working
import { useEffect } from "react";

export default function HumorLegacyRedirect() {
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.location.replace("/features/humor");
		}
	}, []);
	return null;
}


