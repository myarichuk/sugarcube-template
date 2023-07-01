import { MacroContext } from "twine-sugarcube";
import { CustomStoryVariables } from "./common";

//an example custom macro
Macro.add('hello', {
   handler: function (this: MacroContext) {
      const param = this.args[0];
      const variables = State.variables as CustomStoryVariables; //access Twine variables like this
      const message = "Hello " + param + "!";
      variables['message'] = message;

      return new Wikifier(this.output, message);
   },
});
