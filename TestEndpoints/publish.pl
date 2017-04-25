use strict;
use warnings;

open my $fh, 'vss-extension.json' or die $!;
my $content = join '' => <$fh>;
close $fh;

my ($major, $minor, $build) = $content =~ m/"version": "(\d+)\.(\d+)\.(\d+)/sm;
my $new_build = $build + 1;

$content =~ s/"version": "(\d+)\.(\d+)\.(\d+)"/"version": "$major.$minor.$new_build"/;
open $fh, ">vss-extension.json" or die $!;
print $fh $content;
close $fh;


open $fh, './BuildTaskFolder/task.json' or die $!;
$content = join '' => <$fh>;
close $fh;

$content =~ s/"Patch": "$build"/"Patch": "$new_build"/sm;
open $fh, ">./BuildTaskFolder/task.json" or die $!;
print $fh $content;
close $fh;

my $account = 'pshubinatest';

open $fh, '/Users/imago/.tfs_pat' or die $!;
my $token = <$fh>;

close $fh;

my $output = `tfx extension publish --manifest-globs vss-extension.json --share-with $account --token $token`;
print $output;



