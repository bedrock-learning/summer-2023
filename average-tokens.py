import tiktoken
import sys

# Take in a filename as a command line argument and average the number of tokens in each line

enc = tiktoken.encoding_for_model("gpt-4")
filename = sys.argv[1]
total = 0
count = 0
with open(filename, "r") as f:
    for line in f:
        total += len(enc.encode(line))
        count += 1

average = total / count

print(average)