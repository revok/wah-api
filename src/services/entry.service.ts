
import { FilterQuery } from 'mongoose';
import { Inject, Service } from 'typedi';
import { IEntry } from '../interfaces/entry.interface';
import moment from 'moment';
@Service()
export default class EntryService {
  constructor(
    @Inject('entryModel') private entryModel: Models.EntryModel
  ) {
  }

  /**
   * Retrieve entries from storage.
   * @param granularity {string} year/month/day or empty.
   * @returns An array of IEntry objects.
   */
  public async getEntries(granularity ?: string): Promise<IEntry[]> {

    const query: FilterQuery<Models.EntryModel> = {};

    if (granularity) {

      const start = moment().startOf(granularity as moment.unitOfTime.StartOf);
      const end = moment().endOf(granularity as moment.unitOfTime.StartOf);

      if (start.isValid() && end.isValid()) {
        query.createdAt = { $gte: start.toDate(), $lte: end.toDate() };
      }
    }

    return this.entryModel.find(query);
  }

  /**
   * Essentially the same function as getEntries(), but
   * additionally processes the data to group it by value.
   * @param granularity year/month/day or empty.
   * @returns An array of counted entries (grouped by value).
   */
  public async getGroupedData(granularity ?: string): Promise<IEntry[]> {
    return this.getEntries(granularity)
    .then((entries) => {

      // Group by value.
      if (entries) {
        const result: IEntry[] = [];

        const groupedByValue = new Map<number, IEntry[]>();

        for (const e of entries) {
          if (!groupedByValue.has(e.value)) {
            groupedByValue.set(e.value, []);
          }

          const parent = groupedByValue.get(e.value);

          // just in case
          if (Array.isArray(parent)) {
            parent.push(e);
          }
        }


        for (const [key, group] of groupedByValue.entries()) {
          result.push({
            name: String(key),
            value: group.length
          })
        }

        return result;
      }

      return [];
    })
  }

  /**
   * Create a new entry.
   *
   * @param entryDTO
   * @returns The newly created entry.
   */
  public async createEntry(entryDTO: IEntry): Promise<IEntry> {
    return this.entryModel.create(entryDTO);
  }
}