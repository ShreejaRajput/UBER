// ...existing content...

## Recent Updates

- **Captain Logout Route Added:**  
  The backend now includes a `/captains/logout` route to handle captain logout and token blacklisting.

- **Validation Improvements:**  
  - `UserProtectedWrapper` now validates the token and user profile more robustly, redirecting to login if invalid.
  - `CaptainProtectedWrapper` now validates the token and captain profile, redirecting to captain login if invalid.

Refer to the respective files for implementation details.
