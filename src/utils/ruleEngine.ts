import RuleModel, { IRule } from "../models/rule.model"

type WorkflowData = Record<string, string | number | boolean>

interface RuleLog {
  rule: string
  result: boolean
}

interface EvaluationResult {
  nextStepId: string | null
  logs: RuleLog[]
}

const applyFunctions = (
  expression: string,
  data: WorkflowData
): string => {

  let updated = expression

  updated = updated.replace(
    /contains\((\w+),\s*"([^"]+)"\)/g,
    (_, field: string, value: string) => {
      const fieldValue = String(data[field] ?? "")
      return fieldValue.includes(value).toString()
    }
  )

  updated = updated.replace(
    /startswith\((\w+),\s*"([^"]+)"\)/g,
    (_, field: string, value: string) => {
      const fieldValue = String(data[field] ?? "")
      return fieldValue.startsWith(value).toString()
    }
  )

  updated = updated.replace(
    /endswith\((\w+),\s*"([^"]+)"\)/g,
    (_, field: string, value: string) => {
      const fieldValue = String(data[field] ?? "")
      return fieldValue.endsWith(value).toString()
    }
  )

  return updated
}

const replaceFields = (
  expression: string,
  data: WorkflowData
): string => {

  let updated = expression

  Object.keys(data).forEach((key) => {

    const value = data[key]

    if (typeof value === "string") {

      updated = updated.replace(
        new RegExp(`\\b${key}\\b`, "g"),
        `"${value}"`
      )

    } else {

      updated = updated.replace(
        new RegExp(`\\b${key}\\b`, "g"),
        String(value)
      )
    }
  })

  return updated
}

export const evaluateRules = async (
  stepId: string,
  data: Record<string, string | number | boolean>
): Promise<EvaluationResult> => {

  const rules: IRule[] = await RuleModel
    .find({ step_id: stepId })
    .sort({ priority: 1 })

  const logs: RuleLog[] = []

  for (const rule of rules) {

    if (rule.condition === "DEFAULT") {

      return {
        nextStepId: rule?.next_step_id,
        logs
      }
    }

    let expression = rule.condition

    expression = applyFunctions(expression, data)
    expression = replaceFields(expression, data)

    const result = Boolean(eval(expression))

    logs.push({
      rule: rule.condition,
      result
    })

    if (result) {

      return {
        nextStepId: rule.next_step_id,
        logs
      }
    }
  }

  return {
    nextStepId: null,
    logs
  }
}