import { v4 } from "uuid";

class GeneratorId {
  generatedId = (): string => v4();
}

export default new GeneratorId();