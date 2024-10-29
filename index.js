const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { Tokens1, Tokens2, Prefix1, Prefix2, Owner } = require('./config.json');

async function join(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    });
    return connection;
}

async function leave(channel) {
    const connection = getVoiceConnection(channel.guild.id);
    if (connection) connection.destroy();
}

const clientOptions = {
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent  // Pastikan intent ini diaktifkan di Discord Developer Portal
    ]
};

// Bot dengan Token1
for (const Token1 of Tokens1) {
    const client = new Client(clientOptions);

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag} with Token1!`);
    });

    client.on('messageCreate', async (message) => {
        if (message.author.bot || message.channel.type === 'DM') return;

        const messageArray = message.content.split(" ");
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        if (!Owner.includes(message.author.id)) return;

        if (cmd === `${Prefix1}test`) {
            message.channel.send('Test successful.');
        }

        if (cmd === `${Prefix1}join`) {
            const channel = args[0] ? client.channels.cache.get(args[0]) : message.member.voice.channel;
            if (channel && channel.isVoiceBased()) {
                await join(channel);
            } else {
                message.channel.send('Please provide a valid voice channel.');
            }
        }

        if (cmd === `${Prefix1}leave`) {
            const voiceChannel = message.guild.members.cache.get(client.user.id).voice.channel;
            if (voiceChannel) await leave(voiceChannel);
        }
    });

    client.login(Token1);
}

// Bot dengan Token2
for (const Token2 of Tokens2) {
    const client = new Client(clientOptions);

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag} with Token2!`);
    });

    client.on('messageCreate', async (message) => {
        if (message.author.bot || message.channel.type === 'DM') return;

        const messageArray = message.content.split(" ");
        const cmd = messageArray[0];
        const args = messageArray.slice(1);

        if (!Owner.includes(message.author.id)) return;

        if (cmd === `${Prefix2}test`) {
            message.channel.send('Test successful.');
        }

        if (cmd === `${Prefix2}join`) {
            const channel = args[0] ? client.channels.cache.get(args[0]) : message.member.voice.channel;
            if (channel && channel.isVoiceBased()) {
                await join(channel);
            } else {
                message.channel.send('Please provide a valid voice channel.');
            }
        }

        if (cmd === `${Prefix2}leave`) {
            const voiceChannel = message.guild.members.cache.get(client.user.id).voice.channel;
            if (voiceChannel) await leave(voiceChannel);
        }
    });

    client.login(Token2);
}
