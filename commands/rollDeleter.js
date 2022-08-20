const { SlashCommandBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eater")
    .setDescription("Eats a roll")
    .addStringOption((rollToDelete) =>
      rollToDelete
        .setName("name")
        .setDescription("The name of the role to be eaten")
        .setRequired(true)
    ),
  async execute(interaction) {
    const guild = interaction.member.guild;
    const rollToDelete = interaction.options.getString("name");
    try {
      const role = await interaction.member.guild.roles.cache.find(
        (role) => role.name === rollToDelete
      );
      if (role == undefined) {
        interaction.reply("Can't find the roll, bub");
        return;
      }
      await guild.roles.delete(role.id, "I ate it lol");
      await interaction.reply(`The roll ${rollToDelete} has been eaten, bub`);
    } catch (error) {
      console.log(error);
    }
  },
};
