export interface ApiErrorResponse {
  status: number;
  data: { message: string };
}

export function responseError(error: unknown): error is ApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    typeof (error as any).status === "number"
  );
}

export function requestFailed(e: unknown) {
  let err = "An error occurred";
  if (responseError(e)) {
    return e.data.message || err;
  }

  if (e instanceof Error) err = e.message || err;
  return err;
}
