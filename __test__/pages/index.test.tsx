import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Principal from "@/src/pages/index";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",

      // ... whatever else you you call on `router`
    };
  },
}));

describe("testing", () => {
  test("PaginaPrincipal", () => {
    render(<Principal />);

    const header = screen.getByText("PaginaPrincipal");
    expect(header).toBeInTheDocument();
  });
});
