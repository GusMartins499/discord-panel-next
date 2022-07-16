export type ServiceParams = {
  onSuccess: (data?: any) => void
  onError: (error?: any) => void
}

export type CreateAutomationParams = ServiceParams & {
  data: {
    status: string
    schedule: string
  }
}

export type ListAutomationParams = ServiceParams

export type DeleteAutomationParams = ServiceParams & {
  id: string
}

export type GetAutomationParams = ServiceParams & {
  id: string
}

export type UpdateAutomationParams = ServiceParams & {
  id: string
  data: {
    status: string
    schedule: string
  }
}

export type AutomationService = {
  create: (params: CreateAutomationParams) => Promise<any>
  list: (params: ListAutomationParams) => Promise<any>
  remove: (params: DeleteAutomationParams) => Promise<any>
  getAutomation: (params: GetAutomationParams) => Promise<any>
  updateAutomation: (params: UpdateAutomationParams) => Promise<any>
}
