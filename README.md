Use Raspberry Pi as for filter OSC from Eos -> QLab.

A common issue is Eos can only use UDP for sending OSC. So it only sends a single OSC message and packets have been dropped causing cues that don't fire. When a cue is fired Eos sends a bunch of commands at the same time. This script uses redundancy to check for 3 seperate OSC commands to ensure OSC is sent and interpreted to trigger QLab.