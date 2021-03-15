
import { IEntry } from '../interfaces/entry.interface';
import { Inject, Service } from 'typedi';

@Service()
export default class EntryService {
  constructor(
    @Inject('entryModel') private entryModel: Models.EntryModel
  ) {
  }

  /**
   * Return a list of all entries.
   */
  public async getEntries(): Promise<IEntry[]> {
    return this.entryModel.find({});
  }

  /**
   * Create a new entry.
   *
   * @param entryDTO
   * @returns 
   */
  public async createEntry(entryDTO: IEntry): Promise<IEntry> {
    return this.entryModel.create(entryDTO);
  }
}