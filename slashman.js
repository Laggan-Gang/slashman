const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}
client.once("ready", () => {
  console.log("SNIKTBUB!");
});

client.on("interactionCreate", async (interaction) => {
  const command = client.commands.get(interaction.commandName);
  //Like this JS only returns the truthy thing
  const interactionType = interaction.customId || interaction.commandName;

  switch (interactionType) {
    case "roleSelect":
    case "roleSelect2":
      if (!rightPlaceChecker(interaction)) return;
      await personalRoleRemover(interaction);
      break;

    case "Pin message":
      await pin(interaction);
      break;

    default:
      if (!interaction.isChatInputCommand()) return;
      if (!rightPlaceChecker(interaction)) return;
      if (command) {
        try {
          await command.execute(interaction);
        } catch (error) {
          console.error(error);
          await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
            components: [],
          });
        }
      }
  }
});

client.login(token);

async function personalRoleRemover(interaction) {
  if (interaction.values[0] === "cancel") {
    interaction.update({
      content:
        "Smart choice, bub.... If you change your mind, you know where to find me....",
      components: [],
    });
    return;
  }
  const roleToRemove = await interaction.guild.roles.fetch(
    interaction.values[0]
  ); // Interaction.values[0] is where the data from a select menu is stored idk
  console.log(roleToRemove);
  try {
    await interaction.member.roles.remove(roleToRemove);
    await interaction.update({
      content: `Your ${roleToRemove}-roll has been *SNIKT*, bub`,
      components: [],
    });
  } catch (error) {
    console.log(error);
    interaction.update({
      content: "Uh oh , bub " + error,
      components: [],
    });
  }
}

async function pin(interaction) {
  const channel = await interaction.guild.channels.fetch(interaction.channelId);
  const message = await channel.messages.fetch(
    interaction.options._hoistedOptions[0].value
  );
  console.log("pruttis");
  message.pin(interaction.member.user.username + " pinned this");
  interaction.reply("*SNIKT*");
  return;
}

function rightPlaceChecker(interaction) {
  if (interaction.channelId != "539847809004994560") {
    interaction.reply(
      "This ain't the place for this kind of thing, bub. Head on over to " +
        interaction.guild.channels.cache.get("539847809004994560").toString()
    );
    return false;
  } else {
    return true;
  }
}
