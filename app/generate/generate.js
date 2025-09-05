import { Suspense } from "react";
import Generate from "./generate";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Generate />
    </Suspense>
  );
}
