const API_BASE_URL = "https://api-yeshtery.dev.meetusvr.com/v1"

export interface LoginRequest {
  email: string
  password: string
  isEmployee: boolean
}

export interface LoginResponse {
  token: string
  refresh: string
}

export interface UserInfo {
  id: string
  name: string
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/yeshtery/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new ApiError(401, "Invalid email or password")
      }
      throw new ApiError(response.status, "Login failed. Please try again.")
    }

    return response.json()
  },

  async getUserInfo(token: string): Promise<UserInfo> {
    const response = await fetch(`${API_BASE_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new ApiError(response.status, "Failed to fetch user information")
    }

    return response.json()
  },
}
