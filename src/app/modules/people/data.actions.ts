export class GetPeople {
  static readonly type = '[PeopleApi] GetPeople'
  constructor(public readonly page: number) {}
}
export class GetPerson {
  static readonly type = '[PeopleApi] GetPerson'
  constructor(public readonly uid: number) {}
}
export class GetPlanet {
  static readonly type = '[PeopleApi] GetPlanet'
  constructor(public readonly uid: number) {}
}
