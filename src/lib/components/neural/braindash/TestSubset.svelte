<script lang='ts'>
  export let net:any;
  export let dataset:any = [];
  let subset = dataset.slice(0, 10);
  let results = subset.map((data:any) => ({
    input: data.input,
    expected: data.output,
    output: net.run(data.input),
  }));
</script>

<div>
  <h2>Test Subset</h2>
  <pre>{JSON.stringify(results, null, 2)}</pre>
</div>
