// Errors the services are allowed to throw. They say what went wrong in the
// language of the domain, and know nothing about how it will be transported.
export abstract class DomainError extends Error {}

export class NotFoundError extends DomainError {}
export class ForbiddenError extends DomainError {}
export class ConflictError extends DomainError {}
export class UnauthorizedError extends DomainError {}
export class InvalidInputError extends DomainError {}
