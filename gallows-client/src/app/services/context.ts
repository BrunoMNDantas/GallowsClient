export class Context {
      public constructor(
          public lengthsSupplier : () => Promise<number[]>,
          public letterPredicate : (letter : string) => Promise<boolean>,
          public letterPositionsFunction : (letter : string) => Promise<any[]>,
          public completedWordsPredicate : (word : string[]) => Promise<boolean>,
          public sentenceLogger : (text : string) => void,
          public logger : (text : string) => void
      ){}
}
