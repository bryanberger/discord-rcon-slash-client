import { SlashCommand, CommandOptionType, SlashCreator, CommandContext } from 'slash-create';
import { send } from '../lib/connection';

export default class SubsCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'rcon',
      description: 'Run rcon commands.',
      options: [
        {
          type: CommandOptionType.SUB_COMMAND,
          name: 'host_workshop_map',
          description: 'Changes the current map to any workshop map',
          options: [
            {
              name: 'map_id',
              description: 'enter a map id',
              type: CommandOptionType.STRING,
              required: true
            }
          ]
        },
        {
          type: CommandOptionType.SUB_COMMAND,
          name: 'bot_kick',
          description: 'Kick bots from the server',
          options: [
            {
              type: CommandOptionType.STRING,
              name: 'bot_type',
              description: 'Select which bots you want to kick',
              required: true,
              choices: [
                { name: 'all', value: 'all' },
                { name: 'ct', value: 'ct' },
                { name: 't', value: 't' }
              ]
            }
          ]
        }
      ]
    });
  }

  async run(ctx: CommandContext) {
    console.log('ran rcon command');
    // ctx.defer();

    // returns the subcommand, option, and option value
    const returnStringValues = [ctx.subcommands[0]];
    switch (
      ctx.subcommands[0] // Which subcommand was used?
    ) {
      case 'host_workshop_map':
        switch (
          Object.keys(ctx.options[ctx.subcommands[0]])[0] // Which options was used?
        ) {
          case 'map_id':
            await send(`host_workshop_map ${ctx.options[ctx.subcommands[0]]['map_id']}`);

            returnStringValues.push('map_id');
            returnStringValues.push(ctx.options[ctx.subcommands[0]]['map_id']); // value of option
            break;
          // ...
        }
        break;
      case 'bot_kick':
        switch (Object.keys(ctx.options[ctx.subcommands[0]])[0]) {
          case 'bot_type':
            await send(`bot_kick ${ctx.options[ctx.subcommands[0]]['bot_type']}`);

            returnStringValues.push('bot_type');
            returnStringValues.push(ctx.options[ctx.subcommands[0]]['bot_type']);
            break;
          // ...
        }
        break;
    }
    return `Subcommand: \`${returnStringValues[0]}\`\nOption: \`${returnStringValues[1]}\`\nValue of option: \`${returnStringValues[2]}\``;
  }
}
