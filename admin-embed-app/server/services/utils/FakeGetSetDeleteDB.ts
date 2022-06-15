export class FakeGetSetDeleteDB<Schema extends Record<string, any>, PrimaryKey extends keyof Schema> {
  private records: Map<Schema[PrimaryKey], Schema> = new Map();
  private primaryKey: PrimaryKey;

  constructor(primaryKey: PrimaryKey) {
    this.records = new Map();
    this.primaryKey = primaryKey;
  }

  public get = (valueOfPrimaryKey: Schema[PrimaryKey]) => {
    return this.records.get(valueOfPrimaryKey);
  };

  public set = (newRecord: Schema) => {
    this.records.set(newRecord[this.primaryKey], newRecord);
    return true;
  };

  public delete = (valueOfPrimaryKey: Schema[PrimaryKey]) => {
    return this.records.delete(valueOfPrimaryKey);
  };
}
