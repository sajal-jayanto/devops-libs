# 🐚 Shell Scripting — Operators & Special Variables Cheat Sheet

## 🔗 Command & Logical Operators

| Operator | Description | Example |
|---|---|---|
| `&` | Run a command in the background | `ls &` |
| `&&` | Logical AND — run the next command if the previous succeeds | `[ "$foo" -ge 0 ] && [ "$foo" -le 9 ]` |
| `\|\|` | Logical OR — run the next command if the previous fails | `[ "$foo" -lt 0 ] \|\| [ "$foo" -gt 9 ]` |
| `!` | Logical NOT | `[ "$foo" != "bar" ]` |

---

## 🔤 String Operators

| Operator | Description | Example |
|---|---|---|
| `=` | String equality | `[ "$foo" = "bar" ]` |
| `!=` | String inequality | `[ "$foo" != "bar" ]` |
| `-z` | String is empty (zero length) | `[ -z "$foo" ]` |
| `-n` | String is not empty | `[ -n "$foo" ]` |

> **Tip:** Always quote variables when testing strings: `"$foo"`.

---

## 🔢 Numeric Comparison Operators

| Operator | Description | Example |
|---|---|---|
| `-eq` | Equal to | `[ "$foo" -eq 9 ]` |
| `-ne` | Not equal to | `[ "$foo" -ne 9 ]` |
| `-lt` | Less than | `[ "$foo" -lt 9 ]` |
| `-le` | Less than or equal to | `[ "$foo" -le 9 ]` |
| `-gt` | Greater than | `[ "$foo" -gt 9 ]` |
| `-ge` | Greater than or equal to | `[ "$foo" -ge 9 ]` |

### Example

```sh
if [ "$foo" -ge 0 ] && [ "$foo" -le 9 ]; then
    echo "foo is between 0 and 9"
fi
```

---

## 📁 File & Directory Tests

| Operator | Description | Example |
|---|---|---|
| `-d` | Path is a directory | `[ -d "/bin" ]` |
| `-f` | Path is a regular file | `[ -f "/bin/ls" ]` |
| `-r` | Path is readable | `[ -r "/bin/ls" ]` |
| `-w` | Path is writable | `[ -w "/bin/ls" ]` |
| `-x` | Path is executable | `[ -x "/bin/ls" ]` |
| `-nt` | File is newer than another file | `[ "$file1" -nt "$file2" ]` |

### Example

```sh
if [ -f "$file" ]; then
    echo "File exists"
fi
```

---

## 🧩 Special Shell Variables

| Variable | Description | Example |
|---|---|---|
| `$$` | PID of the current shell | `echo "My PID = $$"` |
| `$!` | PID of the most recent background command | `ls & echo "PID = $!"` |
| `$?` | Exit status of the previous command | `ls; echo "Exit code = $?"` |
| `$0` | Name/path of the script | `echo "Script = $0"` |
| `$1` | First positional argument | `echo "First argument = $1"` |
| `$2` | Second positional argument | `echo "Second argument = $2"` |
| `$9` | Ninth positional argument | `echo "Ninth argument = $9"` |
| `${10}` | Tenth positional argument | `echo "Tenth argument = ${10}"` |
| `$#` | Number of positional arguments | `echo "Count = $#" ` |
| `$@` | All positional arguments | `echo "Arguments = $@"` |
| `$*` | All positional arguments as a single expansion | `echo "Arguments = $*"` |

### Positional Arguments

If you run:

```sh
./script.sh apple banana mango
```

Then:

```text
$0  → ./script.sh
$1  → apple
$2  → banana
$3  → mango
$#  → 3
```

---

## 🔎 Regular Expression Anchors

These are commonly used with commands such as `grep`.

| Symbol | Description | Example |
|---|---|---|
| `^` | Beginning of a line | `grep "^foo" file.txt` |
| `$` | End of a line | `grep "foo$" file.txt` |

Example:

```sh
grep "^foo" file.txt
```

Matches lines beginning with `foo`.

```sh
grep "foo$" file.txt
```

Matches lines ending with `foo`.

> **Important:** `^` and `$` have special meanings in regular expressions. They are not general-purpose shell operators.

---

## 🛠️ Functions

Shell functions can be defined using:

```sh
myfunc() {
    echo "Hello"
}
```

Call the function:

```sh
myfunc
```

### Function with Arguments

```sh
greet() {
    echo "Hello $1"
}

greet "Jayanto"
```

Output:

```text
Hello Jayanto
```

Inside a function, `$1`, `$2`, etc. refer to the function's arguments.

---

# ⭐ Quick Reference

```text
COMMAND
    &       → Background

LOGICAL
    &&      → AND
    ||      → OR
    !       → NOT

STRING
    =       → Equal
    !=      → Not equal
    -z      → Empty
    -n      → Not empty

NUMBER
    -eq     → Equal
    -ne     → Not equal
    -lt     → Less than
    -le     → Less/equal
    -gt     → Greater than
    -ge     → Greater/equal

FILE
    -d      → Directory
    -f      → Regular file
    -r      → Readable
    -w      → Writable
    -x      → Executable
    -nt     → Newer than

SPECIAL VARIABLES
    $$      → Current shell PID
    $!      → Last background PID
    $?      → Last exit status
    $0      → Script name
    $1-$9   → Positional arguments
    ${10}   → Argument 10+
    $#      → Argument count
    $@      → All arguments
    $*      → All arguments as one expansion

REGEX
    ^       → Start of line
    $       → End of line
```